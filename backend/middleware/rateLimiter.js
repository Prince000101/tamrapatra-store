import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;
