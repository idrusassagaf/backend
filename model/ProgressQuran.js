import mongoose from "mongoose";

const progressQuranSchema = new mongoose.Schema(
  {
    santriId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Santri",
      required: true,
    },
    // 🟢 Field santri, tidak wajib tapi tetap disimpan kalau ada
    noId: { type: String, default: "" },
    nama: { type: String, default: "" },
    guru: { type: String, default: "" },
    kelas: { type: String, default: "" },

    juz: { type: String, default: "" },
    surat: { type: String, default: "" },
    ayat: { type: String, default: "" },
    halaman: { type: String, default: "" },
    nilai: { type: String, default: "" },
    catatan: { type: String, default: "" },
  },
  { timestamps: true } // otomatis buat createdAt & updatedAt
);

// === Virtual tanggal sama seperti ProgressIqra
progressQuranSchema.virtual("tanggal").get(function () {
  const date = this.updatedAt || this.createdAt;
  const tgl = date.getDate().toString().padStart(2, "0");
  const bln = (date.getMonth() + 1).toString().padStart(2, "0");
  const thn = date.getFullYear();
  return `${tgl}-${bln}-${thn}`;
});

progressQuranSchema.set("toJSON", { virtuals: true });

export default mongoose.model("ProgressQuran", progressQuranSchema);
