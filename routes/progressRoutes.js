import express from "express";
import {
  getAllProgress,
  getAllProgressWithSantri,
  getProgressBySantriDetail, // ✅ ganti ini
  getProgressById,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

const router = express.Router();

// Route list
router.get("/", getAllProgress);
router.get("/with-santri", getAllProgressWithSantri);
router.get("/santri/:id", getProgressBySantriDetail); // ✅ Detail by ID santri
router.get("/:id", getProgressById);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

export default router;
