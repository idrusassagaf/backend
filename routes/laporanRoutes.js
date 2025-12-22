import express from "express";
import {
  downloadLaporanExcel,
  downloadLaporanPDF,
} from "../controller/laporanController.js";

const router = express.Router();

// Endpoint download Excel
router.get("/download/excel", downloadLaporanExcel);

// Endpoint download PDF
router.get("/download/pdf", downloadLaporanPDF);

export default router;
