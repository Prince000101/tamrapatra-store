import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

connectDB();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "prince@creatordev.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const BRAND_NAME = "Tamrapatra";

const importData = async () => {
  try {
    await Product.deleteMany({ brand: BRAND_NAME });
    console.log(`${BRAND_NAME} products cleared...`);

    const productsWithBrand = products.map((p) => ({ ...p, brand: BRAND_NAME }));
    await Product.insertMany(productsWithBrand);
    console.log("Products imported ✅");

    if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
      console.error("ADMIN_PASSWORD env var required (min 8 chars)");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await User.findOneAndUpdate(
      { email: ADMIN_EMAIL.toLowerCase() },
      { name: "Admin", email: ADMIN_EMAIL.toLowerCase(), password: hashedPassword, isAdmin: true },
      { upsert: true, new: true }
    );

    console.log(`Admin user created ✅`);
    console.log(`   Email: ${ADMIN_EMAIL.toLowerCase()}`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany({ isAdmin: true });
    console.log("Data Destroyed 🔥");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
