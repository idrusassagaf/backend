import express from "express";
import {
  getAllProgressQuran,
  createProgressQuran, // ✅ ini sesuai dengan controller
  getProgressBySantri,
  updateProgressQuran,
  deleteProgressQuran,
} from "../controllers/progressQuranController.js";
const router = express.Router();

// ✅ Ambil semua progress Quran
router.get("/", getAllProgressQuran);

// ✅ Tambah progress baru
router.post("/", createProgressQuran);

// ✅ Ambil progress berdasarkan ID santri
router.get("/:santriId", getProgressBySantri);

// ✅ Update progress Quran
router.put("/:id", updateProgressQuran);

// ✅ Hapus progress Quran
router.delete("/:id", deleteProgressQuran);

export default router;
