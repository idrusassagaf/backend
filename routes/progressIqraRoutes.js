import express from "express";
import {
  getAllProgressIqra,
  updateProgressIqra,
} from "../controllers/progressIqraController.js";

const router = express.Router();

router.get("/", getAllProgressIqra);
router.put("/:id", updateProgressIqra);

export default router;
