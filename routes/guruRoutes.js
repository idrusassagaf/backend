import express from "express";
import {
  createGuru,
  getGuru,
  getGuruById,
  updateGuru,
  deleteGuru,
} from "../controllers/guruController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Tambah guru + upload foto
router.post("/", upload.single("foto"), createGuru);

// Semua guru
router.get("/", getGuru);

// Detail guru
router.get("/:id", getGuruById);

// Update guru + upload foto
router.put("/:id", upload.single("foto"), updateGuru);

// Hapus guru
router.delete("/:id", deleteGuru);

export default router;
