const Notification = require("../models/notification.js");

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "fullName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications fetched successfully",
      totalNotifications: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getMyNotifications,
  markNotificationAsRead,
};
