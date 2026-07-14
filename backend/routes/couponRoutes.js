import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error("GET COUPONS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", protect, admin, async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;
    if (!code || !discount) {
      return res.status(400).json({ message: "Code and discount are required" });
    }
    const exists = await Coupon.findOne({ code: code.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }
    const coupon = await Coupon.create({ code, discount, expiresAt });
    res.status(201).json(coupon);
  } catch (error) {
    console.error("CREATE COUPON ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json({ message: "Coupon deleted" });
  } catch (error) {
    console.error("DELETE COUPON ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
