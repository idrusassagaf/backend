import express from "express";
import {
  getOrangtua,
  createOrangtua,
  updateOrangtua,
  deleteOrangtua,
} from "../controllers/orangtuaController.js";

const router = express.Router();

router.get("/", getOrangtua);
router.post("/", createOrangtua);
router.put("/:id", updateOrangtua);
router.delete("/:id", deleteOrangtua);

export default router;
