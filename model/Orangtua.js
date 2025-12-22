import mongoose from "mongoose";

const orangtuaSchema = new mongoose.Schema({
  santriId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Santri",
    required: true,
  },

  namaAyah: { type: String, default: "" },
  namaIbu: { type: String, default: "" },

  statusAyah: { type: String, default: "" },
  statusIbu: { type: String, default: "" },

  pekerjaanAyah: { type: String, default: "" },
  pekerjaanIbu: { type: String, default: "" },

  statusAnak: { type: String, default: "" },
});

export default mongoose.model("Orangtua", orangtuaSchema);
