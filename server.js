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
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import orangtuaRoutes from "./routes/orangtuaRoutes.js";
import hafalanRoutes from "./routes/hafalanRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload Endpoint
app.post("/api/santri/upload", upload.single("foto"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Tidak ada file diupload" });
  const filePath = `/uploads/${req.file.filename}`;
  console.log("📸 File diupload:", filePath);
  res.status(200).json({ filePath });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/santri", santriRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/progress-iqra", progressIqraRoutes);
app.use("/api/progress-quran", progressQuranRoutes);
app.use("/api/orangtua", orangtuaRoutes);
app.use("/api/hafalan", hafalanRoutes);

// Start server with MongoDB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected to:", conn.connection.name);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // stop server jika gagal konek DB
  }
};

startServer();
