import mongoose from "mongoose";

const santriSchema = new mongoose.Schema({
  noId: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  kelas: { type: String, required: true },
  tanggalLahir: { type: Date, required: true },
  gender: { type: String, required: true },
  alamat: String,
  orangtua: String,
  kontak: String,
  guru: { type: String }, // simpan nama guru atau guruId
  foto: { type: String, default: "" },
});

export default mongoose.model("Santri", santriSchema);
