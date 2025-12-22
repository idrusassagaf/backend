import mongoose from "mongoose";

const progressIqraSchema = new mongoose.Schema(
  {
    santriId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Santri",
      required: true,
    },
    noId: String,
    nama: String,
    guru: String,
    kelas: String,
    jilid: String,
    halaman: String,
    nilai: String,
    catatan: String,
  },
  { timestamps: true } // otomatis buat createdAt & updatedAt
);

// === Tambahkan ini bro ===
progressIqraSchema.virtual("tanggal").get(function () {
  const date = this.updatedAt || this.createdAt;
  const tgl = date.getDate().toString().padStart(2, "0");
  const bln = (date.getMonth() + 1).toString().padStart(2, "0");
  const thn = date.getFullYear();
  return `${tgl}-${bln}-${thn}`;
});

progressIqraSchema.set("toJSON", { virtuals: true });

const ProgressIqra = mongoose.model("ProgressIqra", progressIqraSchema);
export default ProgressIqra;
