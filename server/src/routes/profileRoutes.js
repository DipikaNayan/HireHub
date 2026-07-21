const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.patch("/change-password", verifyToken, changePassword);

module.exports = router;
