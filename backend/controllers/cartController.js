import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= ADD TO CART ================= */
export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const quantity = Math.max(1, Math.floor(Number(qty)));

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = user.cart.find((item) => item.product.toString() === productId);
    const totalQty = existing ? existing.qty + quantity : quantity;

    if (totalQty > product.countInStock) {
      return res.status(400).json({ message: `Only ${product.countInStock} in stock` });
    }

    if (existing) {
      existing.qty = totalQty;
    } else {
      user.cart.push({ product: productId, qty: quantity });
    }

    await user.save();
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= UPDATE CART ITEM ================= */
export const updateCartItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const user = await User.findById(req.user._id);
    const item = user.cart.find((item) => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.qty = Math.max(1, Math.floor(Number(qty)));
    await user.save();
    res.json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();
    res.json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= CLEAR CART ================= */
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared", cart: [] });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};