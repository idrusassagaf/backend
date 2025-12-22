import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import santriRoutes from "./routes/santriRoutes.js";
import guruRoutes from "./routes/guruRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import progressIqraRoutes from "./routes/progressIqraRoutes.js";
import progressQuranRoutes from "./routes/progressQuranRoutes.js";
import orangtuaRoutes from "./routes/orangtuaRoutes.js";
import hafalanRoutes from "./routes/hafalanRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (SERVERLESS SAFE)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB connected");
}

// Auto-connect before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend TPQ berjalan 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/santri", santriRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/progress-iqra", progressIqraRoutes);
app.use("/api/progress-quran", progressQuranRoutes);
app.use("/api/orangtua", orangtuaRoutes);
app.use("/api/hafalan", hafalanRoutes);

// ⛔ JANGAN app.listen()
// ✅ WAJIB EXPORT
export default app;
