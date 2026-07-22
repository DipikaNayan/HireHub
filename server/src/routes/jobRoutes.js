const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/jobController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.get("/", getAllJobs);
router.post("/create", verifyToken, createJob);
router.get("/my", verifyToken, getMyJobs);
router.get("/saved", verifyToken, getSavedJobs);
router.post("/save/:jobId", verifyToken, saveJob);
router.delete("/saved/:jobId", verifyToken, removeSavedJob);

router.get("/:id", getJobById);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

module.exports = router;
