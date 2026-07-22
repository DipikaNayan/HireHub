const express = require("express");
const router = express.Router();

const {
  getRecruiterDashboard,
  getCandidateDashboard,
  recruiterAnalytics,
} = require("../controllers/dashboardController.js");
const verifyToken = require("../middlewares/authMiddleware.js");
// const { verifyToken } = require("../middlewares/authMiddleware.js");

router.get("/recruiter", verifyToken, getRecruiterDashboard);
router.get("/candidate", verifyToken, getCandidateDashboard);
router.get("/recruiter-analytics", verifyToken, recruiterAnalytics);

module.exports = router;
