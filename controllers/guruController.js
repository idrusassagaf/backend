import fs from "fs";
import path from "path";
import Guru from "../model/Guru.js";
import Santri from "../model/Santri.js";
import Progress from "../model/Progress.js";

// Hitung umur
const hitungUmur = (tglLahir) => {
  const today = new Date();
  const birthDate = new Date(tglLahir);
  let umur = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    umur--;
  }
  return umur;
};

// Generate ID guru
const generateGuruId = () => {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `G-TPQH.${randomNum}`;
};

// =========================
//     CREATE GURU + FOTO
// =========================
export const createGuru = async (req, res) => {
  try {
    const { nama, tglLahir, gender, pelajaran, alamat, pendidikan, nomorHp } =
      req.body;

    const foto = req.file ? req.file.filename : null;
    const guruId = generateGuruId();
    const umur = hitungUmur(tglLahir);

    const guru = new Guru({
      guruId,
      nama,
      tglLahir,
      umur,
      gender,
      pelajaran,
      alamat,
      pendidikan,
      nomorHp,
      foto, // SIMPAN FOTO
    });

    await guru.save();
    res.status(201).json(guru);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal membuat guru: " + error.message });
  }
};

// =========================
//      GET ALL GURU
// =========================
export const getGuru = async (req, res) => {
  try {
    const guru = await Guru.find();
    res.json(guru);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//      GET GURU BY ID
// =========================
export const getGuruById = async (req, res) => {
  try {
    const guru = await Guru.findById(req.params.id);
    if (!guru) return res.status(404).json({ message: "Guru tidak ditemukan" });
    res.json(guru);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//   UPDATE GURU + FOTO
// =========================
export const updateGuru = async (req, res) => {
  try {
    const { nama, tglLahir, gender, pelajaran, alamat, pendidikan, nomorHp } =
      req.body;

    const guruLama = await Guru.findById(req.params.id);
    if (!guruLama)
      return res.status(404).json({ message: "Guru tidak ditemukan" });

    let umur = guruLama.umur;
    if (tglLahir) umur = hitungUmur(tglLahir);

    // FOTO BARU
    let foto = guruLama.foto;
    if (req.file) {
      foto = req.file.filename;

      // hapus foto lama
      const oldPath = path.join("uploads", guruLama.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updatedGuru = await Guru.findByIdAndUpdate(
      req.params.id,
      {
        nama,
        tglLahir,
        umur,
        gender,
        pelajaran,
        alamat,
        pendidikan,
        nomorHp,
        foto,
      },
      { new: true }
    );

    // sinkron nama guru
    if (nama && nama !== guruLama.nama) {
      await Santri.updateMany(
        { namaGuru: guruLama.nama },
        { $set: { namaGuru: nama } }
      );
      await Progress.updateMany(
        { namaGuru: guruLama.nama },
        { $set: { namaGuru: nama } }
      );
    }

    res.json({
      message: "Guru dan data terkait berhasil diperbarui",
      updatedGuru,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal update guru: " + error.message });
  }
};

// =========================
//        DELETE GURU
// =========================
export const deleteGuru = async (req, res) => {
  try {
    const guru = await Guru.findByIdAndDelete(req.params.id);
    if (!guru) return res.status(404).json({ message: "Guru tidak ditemukan" });

    if (guru.foto) {
      const filePath = path.join("uploads", guru.foto);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Guru berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
