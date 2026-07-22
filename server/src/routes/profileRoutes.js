const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware.js");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadResume,
  deleteResume,
} = require("../controllers/profileController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.patch("/change-password", verifyToken, changePassword);
router.post(
  "/upload-resume",
  verifyToken,
  upload.single("resume"),
  uploadResume,
);
router.delete("/resume", verifyToken, deleteResume);

module.exports = router;
