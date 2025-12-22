import Progress from "../model/Progress.js";
import Santri from "../model/Santri.js";

// ==========================================
// ✅ Ambil semua progress (debug / opsional)
export const getAllProgress = async (req, res) => {
  try {
    const data = await Progress.find().populate("santriId", "nama kelas guru");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error getAllProgress:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ✅ Ambil daftar semua santri (untuk list Progress Hafalan)
export const getAllProgressWithSantri = async (req, res) => {
  try {
    const santriList = await Santri.find({}, "nama kelas guru")
      .sort({ nama: 1 })
      .lean();

    const result = santriList.map((santri) => ({
      _id: santri._id,
      nama: santri.nama,
      kelas: santri.kelas,
      guru: santri.guru,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error getAllProgressWithSantri:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ✅ Ambil progress berdasarkan ID SANTRI
export const getProgressBySantriDetail = async (req, res) => {
  try {
    const santriId = req.params.id;

    // Ambil data santri
    const santri = await Santri.findById(santriId)
      .select("noId nama kelas guru")
      .lean();
    if (!santri)
      return res.status(404).json({ message: "Santri tidak ditemukan" });

    // Ambil dokumen progress terbaru untuk santri ini
    const progressDoc = await Progress.findOne({ santriId })
      .sort({ createdAt: -1 })
      .lean();

    // Data hafalan (jika sudah ada)
    const hafalanArray =
      progressDoc && Array.isArray(progressDoc.hafalan)
        ? progressDoc.hafalan
        : [];

    // Siapkan metadata
    const meta = {
      noId: progressDoc?.noId || santri.noId || "",
      nilai: progressDoc?.nilai || "",
      catatan: progressDoc?.catatan || "",
      tanggal: progressDoc?.tanggal || "",
      jilid: progressDoc?.jilid || "",
      hal: progressDoc?.hal || "",
      progressId: progressDoc?._id || null,
    };

    res.status(200).json({
      santri,
      progress: hafalanArray,
      meta,
    });
  } catch (error) {
    console.error("❌ Error getProgressBySantriDetail:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ✅ Ambil progress berdasarkan ID progress (_id)
export const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id).populate(
      "santriId"
    );
    if (!progress)
      return res.status(404).json({ message: "Progress tidak ditemukan" });
    res.status(200).json(progress);
  } catch (error) {
    console.error("❌ Error getProgressById:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ✅ Update atau Buat Progress
// UPDATE progress by progress._id or by santriId
export const updateProgress = async (req, res) => {
  try {
    const id = req.params.id;

    // Format tanggal lokal (Indonesia)
    const tanggalBaru = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Siapkan payload lengkap
    const payload = {
      ...req.body,
      tanggal: tanggalBaru, // ✅ selalu update tanggal otomatis
    };

    // Coba update by _id progress terlebih dahulu
    let updated = await Progress.findByIdAndUpdate(id, payload, { new: true });

    // Jika tidak ada progress doc dengan _id tersebut, mungkin frontend kirim id santri
    if (!updated) {
      updated = await Progress.findOneAndUpdate({ santriId: id }, payload, {
        new: true,
      });
    }

    // Jika belum ada progress sama sekali, buat baru
    if (!updated) {
      const newDoc = new Progress({ santriId: id, ...payload });
      await newDoc.save();
      return res.status(201).json(newDoc);
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updateProgress:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ✅ Hapus progress (opsional)
export const deleteProgress = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Progress dihapus" });
  } catch (error) {
    console.error("❌ Error deleteProgress:", error);
    res.status(500).json({ message: error.message });
  }
};
