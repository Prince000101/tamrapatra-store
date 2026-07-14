import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Review from "../models/Review.js";

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
