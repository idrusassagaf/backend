import Hafalan from "../model/hafalanModel.js";

// ===== Ambil semua hafalan (kolektif) =====
export const getSemuaHafalan = async (req, res) => {
  try {
    const data = await Hafalan.find()
      .populate("santriId", "nama kelas guru")
      .sort({ updatedAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== Hafalan per santri =====
export const getHafalanPerSantri = async (req, res) => {
  try {
    const { santriId } = req.params;

    const data = await Hafalan.find({ santriId }).sort({ updatedAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== Tambah data hafalan =====
export const tambahHafalan = async (req, res) => {
  try {
    const newData = new Hafalan(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== Update hafalan =====
export const updateHafalan = async (req, res) => {
  try {
    const updated = await Hafalan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
