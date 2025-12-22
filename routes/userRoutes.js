import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authModdleware.js"; // ← IMPORT DI SINI

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// Contoh route proteksi:
// router.get("/me", authMiddleware, getUserProfile);

export default router;
