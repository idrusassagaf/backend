// controllers/santriController.js
import Santri from "../model/Santri.js";
import Guru from "../model/Guru.js";

// GET all santri + format guruNama
export const getSantri = async (req, res) => {
  try {
    const santri = await Santri.find().lean();
    const guruList = await Guru.find().lean();

    const formatted = santri.map((s) => {
      let guruNama = "-";

      if (s.guru) {
        if (typeof s.guru === "object" && s.guru.nama) {
          guruNama = s.guru.nama;
        } else if (typeof s.guru === "string") {
          const found =
            guruList.find((g) => g._id?.toString() === s.guru) ||
            guruList.find((g) => g.guruId === s.guru) ||
            guruList.find((g) => g.nama === s.guru);

          if (found) guruNama = found.nama;
          else guruNama = s.guru;
        }
      }

      return {
        ...s,
        guruNama,
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error getSantri:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createSantri = async (req, res) => {
  try {
    const santri = new Santri(req.body);
    await santri.save();
    res.status(201).json(santri);
  } catch (error) {
    console.error("Error createSantri:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateSantri = async (req, res) => {
  try {
    const updated = await Santri.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updateSantri:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteSantri = async (req, res) => {
  try {
    await Santri.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Santri deleted" });
  } catch (error) {
    console.error("Error deleteSantri:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE hanya Nilai & Catatan
export const updateProgress = async (req, res) => {
  try {
    const { nilai, catatan } = req.body;

    // Ambil dokumen santri
    const santri = await Santri.findById(req.params.id);
    if (!santri)
      return res.status(404).json({ message: "Santri tidak ditemukan" });

    // Hanya update field yang diubah
    santri.nilai = nilai;
    santri.catatan = catatan;

    await santri.save();

    res.status(200).json(santri);
  } catch (error) {
    console.error("Error updateProgress:", error);
    res.status(500).json({ message: "Gagal update progress" });
  }
};
