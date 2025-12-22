import express from "express";
import multer from "multer";
import {
  getSantri,
  createSantri,
  updateSantri,
  deleteSantri,
  updateProgress,
} from "../controllers/santriController.js";

import Santri from "../model/Santri.js"; // 🔥 Wajib untuk cek ID
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ====================================================================
// 🔥 Generate No.ID otomatis acak 5 digit dengan prefix "TPQH-"
// URL: GET /api/santri/next-id
// ====================================================================
router.get("/next-id", async (req, res) => {
  try {
    let randomId;
    let exists = true;

    while (exists) {
      // Generate angka acak 5 digit (range 10000 - 99999)
      const randomNumber = Math.floor(10000 + Math.random() * 90000);

      randomId = `TPQH-${randomNumber}`;

      // Cek apakah sudah ada di database
      exists = await Santri.findOne({ noId: randomId });
    }

    res.json({ nextId: randomId });
  } catch (err) {
    console.error("❌ Error generate ID:", err);
    res.status(500).json({ message: "Gagal generate ID" });
  }
});

// ====================================================================
// 🔥 ROUTES UTAMA SANTRI
// ====================================================================
router.get("/", getSantri);
router.post("/", createSantri);
router.put("/:id", updateSantri);
router.delete("/:id", deleteSantri);
router.patch("/:id/progress", updateProgress);

// ====================================================================
// 🔥 Upload foto santri
// URL: POST /api/santri/upload
// ====================================================================
router.post("/upload", upload.single("foto"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Tidak ada file diunggah",
      });
    }

    res.status(200).json({
      message: "Upload berhasil",
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error("❌ Upload gagal:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat upload",
    });
  }
});

export default router;
