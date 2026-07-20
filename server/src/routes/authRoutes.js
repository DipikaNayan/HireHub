const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware.js");

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController.js");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
