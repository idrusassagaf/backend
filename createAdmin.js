import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./model/User.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const email = "admin@tpq.com";
    const plainPassword = "123456";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name: "Admin TPQ",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", plainPassword);

    process.exit();
  })
  .catch((err) => console.log(err));
