const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController.js");

const verifyToken = require("../middlewares/authMiddleware.js");
router.get("/", verifyToken, getMyNotifications);

router.patch("/:notificationId", verifyToken, markNotificationAsRead);
module.exports = router;
