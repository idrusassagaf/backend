import mongoose from "mongoose";

const hafalanSchema = new mongoose.Schema(
  {
    santriId: { type: mongoose.Schema.Types.ObjectId, ref: "Santri" },
    kelas: String,
    nama: String,
    nilai: String,
    noId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Hafalan", hafalanSchema);
