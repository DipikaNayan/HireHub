const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware.js");
const uploadImage = require("../middlewares/imageUploadMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadResume,
  deleteResume,
  uploadProfilePicture,
  deleteProfilePicture,
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
router.patch(
  "/upload-profile-picture",
  verifyToken,
  uploadImage.single("profilePicture"),
  uploadProfilePicture,
);
router.delete("/delete-profile-picture", verifyToken, deleteProfilePicture);

module.exports = router;
