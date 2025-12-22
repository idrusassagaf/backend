// backend/model/Progress.js
import mongoose from "mongoose";

const hafalanSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    status: {
      type: String,
      enum: ["Lancar", "Belum Lancar"],
      default: "Belum Lancar",
    },
  },
  { _id: false } // tidak perlu _id di setiap item hafalan
);

const progressSchema = new mongoose.Schema(
  {
    santriId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Santri", // relasi ke model Santri
      required: true,
    },
    noId: String,
    nama: String,
    guru: String,
    kelas: String,
    nilai: { type: String },
    catatan: { type: String },
    tanggal: { type: String },

    // 🔹 Tambahan untuk Progress Iqra
    jilid: { type: String, default: "" },
    hal: { type: String, default: "" },

    // ✅ Tambahan baru — array hafalan
    hafalan: {
      type: [hafalanSchema],
      default: [], // supaya aman walau kosong
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
