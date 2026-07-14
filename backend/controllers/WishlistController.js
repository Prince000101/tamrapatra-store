import mongoose from "mongoose";
import User from "../models/User.js";

/* GET WISHLIST */
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("Wishlist");
    res.json(user.Wishlist);
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ADD TO WISHLIST */
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid product ID is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user.Wishlist.includes(productId)) {
      user.Wishlist.push(productId);
      await user.save();
    }

    res.json(user.Wishlist);
  } catch (error) {
    console.error("ADD TO WISHLIST ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* REMOVE FROM WISHLIST */
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid product ID is required" });
    }

    const user = await User.findById(req.user._id);

    user.Wishlist = user.Wishlist.filter((id) => id.toString() !== productId);

    await user.save();

    res.json(user.Wishlist);
  } catch (error) {
    console.error("REMOVE FROM WISHLIST ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};