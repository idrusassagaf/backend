// backend/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./model/User.js"; // sesuaikan path model kamu

dotenv.config();

// connect ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    // info admin
    const email = process.env.ADMIN_EMAIL || "admin@tpq.com";
    const plainPassword = process.env.ADMIN_PASSWORD || "123456"; // tetap pakai 123456
    const name = "Administrator";

    // cek apakah admin sudah ada
    let adminUser = await User.findOne({ email });

    if (adminUser) {
      console.log(`⚠️ User dengan email ${email} sudah ada`);
    } else {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      adminUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log(`✅ Admin user dengan email ${email} berhasil dibuat`);
    }

    process.exit();
  } catch (err) {
    console.error("❌ Error saat seed admin:", err);
    process.exit(1);
  }
};

connectDB();
