const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  withdrawApplication,
  getApplicantsForJob,
  updateApplicationStatus,
  checkApplication,
} = require("../controllers/applicationController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.post("/:jobId", verifyToken, applyJob);
router.get("/my", verifyToken, getMyApplications);
router.patch("/withdraw/:applicationId", verifyToken, withdrawApplication);
router.get("/job/:jobId", verifyToken, getApplicantsForJob);
router.patch("/:applicationId/status", verifyToken, updateApplicationStatus);

router.get("/check/:jobId", verifyToken, checkApplication);
router.patch("/withdraw/:applicationId", verifyToken, withdrawApplication);

module.exports = router;
