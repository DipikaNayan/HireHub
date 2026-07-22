const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware.js");
const loginLimiter = require("../middlewares/rateLimiter.js");

const {
  register,
  login,
  getProfile,
  testEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController.js");

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/profile", verifyToken, getProfile);
router.get("/test-email", testEmail);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

module.exports = router;
