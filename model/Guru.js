import mongoose from "mongoose";

const guruSchema = new mongoose.Schema(
  {
    guruId: { type: String, unique: true },

    nama: { type: String, required: true },

    gender: { type: String, enum: ["L", "P"], required: true },

    tglLahir: { type: Date },
    umur: { type: Number },

    pelajaran: { type: String }, // contoh: Iqra 1, Iqra 2, Al Quran 3

    alamat: { type: String },
    pendidikan: { type: String },

    nomorHp: { type: String },

    // 🔥 FIELD FOTO — WAJIB ADA
    foto: { type: String }, // nama file yang disimpan multer

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Guru", guruSchema);
