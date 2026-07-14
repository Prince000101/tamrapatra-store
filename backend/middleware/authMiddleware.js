import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) 
      {
        return res.status(401).json({ message: "No token provided" });
      } 
      
      {
        token = authHeader.split(" ")[1];
      }

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }

    // ✅ SAFE USER ID HANDLING
    const userId = decoded.id || decoded.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found. Please login again." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Auth middleware error" });
  }
};