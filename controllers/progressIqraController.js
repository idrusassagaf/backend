// backend/controllers/progressIqraController.js
import ProgressIqra from "../model/ProgressIqra.js";
import Santri from "../model/Santri.js";

// ✅ Ambil semua data Progress Iqra
export const getAllProgressIqra = async (req, res) => {
  try {
    const santriIqra = await Santri.find({ kelas: /iqra/i }).sort({ nama: 1 });
    const allProgress = await ProgressIqra.find({ kelas: /iqra/i });

    const merged = santriIqra.map((s) => {
      const prog = allProgress.find(
        (p) => p.santriId?.toString() === s._id.toString()
      );

      // format tanggal updateAt (atau createdAt jika belum pernah diupdate)
      const dateObj = prog?.updatedAt || prog?.createdAt;
      const tanggalFormatted = dateObj
        ? new Date(dateObj)
            .toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-")
        : "";

      return {
        _id: prog?._id || null,
        santriId: s._id,
        noId: s.noId,
        nama: s.nama,
        guru: s.guru,
        kelas: s.kelas,
        nilai: prog?.nilai || "",
        catatan: prog?.catatan || "",
        jilid: prog?.jilid || "",
        hal: prog?.halaman || "",
        tanggal: tanggalFormatted, // ✅ tampilkan tanggal format tgl-bln-thn
      };
    });

    res.json(merged);
  } catch (err) {
    console.error("❌ Error getAllProgressIqra:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Simpan atau Update Progress Iqra berdasarkan santriId
export const updateProgressIqra = async (req, res) => {
  try {
    console.log("📥 [DEBUG] Request updateProgressIqra diterima:");
    console.log("params.id =>", req.params.id);
    console.log("body =>", req.body);

    const { jilid, hal, halaman, nilai, catatan } = req.body;
    const santriId = req.params.id;

    const santri = await Santri.findById(santriId);
    if (!santri) {
      return res.status(404).json({ message: "Santri tidak ditemukan" });
    }

    const updateData = {
      santriId,
      noId: santri.noId,
      nama: santri.nama,
      guru: santri.guru,
      kelas: santri.kelas,
      nilai,
      catatan,
      jilid,
      halaman: hal || halaman || "",
      updatedAt: new Date(), // ✅ perbarui tanggal setiap kali update
    };

    // upsert (update jika ada, buat baru jika belum)
    const progress = await ProgressIqra.findOneAndUpdate(
      { santriId },
      updateData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      message: "✅ Progress Iqra berhasil disimpan / diperbarui",
      progress,
    });
  } catch (err) {
    console.error("❌ Error updateProgressIqra:", err.message);
    res.status(500).json({ message: err.message });
  }
};
