import ProgressQuran from "../model/ProgressQuran.js";
import Santri from "../model/Santri.js";

// ✅ Ambil semua progress Al Quran (termasuk santri yang belum punya progress)
export const getAllProgressQuran = async (req, res) => {
  try {
    const data = await Santri.aggregate([
      { $match: { kelas: /al quran/i } },
      {
        $lookup: {
          from: "progressqurans",
          localField: "_id",
          foreignField: "santriId",
          as: "progress",
        },
      },
      {
        $addFields: {
          lastProgress: { $arrayElemAt: [{ $slice: ["$progress", -1] }, 0] },
        },
      },
      {
        $project: {
          _id: "$lastProgress._id",
          santriId: "$_id",
          noId: "$noId",
          nama: "$nama",
          kelas: "$kelas",
          guru: "$guru",
          juz: "$lastProgress.juz",
          surat: "$lastProgress.surat",
          ayat: "$lastProgress.ayat",
          halaman: "$lastProgress.halaman",
          nilai: "$lastProgress.nilai",
          catatan: "$lastProgress.catatan",
          createdAt: "$lastProgress.createdAt",
          updatedAt: "$lastProgress.updatedAt",
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.error("Gagal ambil data Progress Quran:", err);
    res.status(500).json({ message: "Gagal ambil data Progress Quran" });
  }
};

// ✅ Tambah progress baru
export const createProgressQuran = async (req, res) => {
  try {
    const { santriId, juz, surat, ayat, halaman, nilai, catatan } = req.body;

    const santri = await Santri.findById(santriId);
    if (!santri) {
      return res.status(404).json({ message: "Santri tidak ditemukan" });
    }

    const newProgress = await ProgressQuran.create({
      santriId,
      juz,
      surat,
      ayat,
      halaman,
      nilai,
      catatan,
      noId: santri.noId,
      nama: santri.nama,
      kelas: santri.kelas,
      guru: santri.guru,
    });

    res.status(201).json(newProgress);
  } catch (err) {
    console.error("Gagal tambah progress Quran:", err);
    res.status(500).json({ message: "Gagal tambah progress Quran" });
  }
};

// ✅ Ambil progress berdasarkan santriId
export const getProgressBySantri = async (req, res) => {
  try {
    const { santriId } = req.params;
    const progress = await ProgressQuran.find({ santriId }).sort({
      createdAt: -1,
    });
    res.json(progress);
  } catch (err) {
    console.error("Gagal ambil progress per santri:", err);
    res.status(500).json({ message: "Gagal ambil progress per santri" });
  }
};

// ✅ Update progress Quran
export const updateProgressQuran = async (req, res) => {
  try {
    const updated = await ProgressQuran.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Gagal update progress Quran:", err);
    res.status(500).json({ message: "Gagal update progress Quran" });
  }
};

// ✅ Hapus progress Quran
export const deleteProgressQuran = async (req, res) => {
  try {
    await ProgressQuran.findByIdAndDelete(req.params.id);
    res.json({ message: "Progress Quran berhasil dihapus" });
  } catch (err) {
    console.error("Gagal hapus progress Quran:", err);
    res.status(500).json({ message: "Gagal hapus progress Quran" });
  }
};
