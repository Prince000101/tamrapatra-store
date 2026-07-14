import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import Review from "../models/Review.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("GET PRODUCT REVIEWS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;