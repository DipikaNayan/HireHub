const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.get("/", getAllJobs);
router.post("/create", verifyToken, createJob);
router.get("/my", verifyToken, getMyJobs);

router.get("/:id", getJobById);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

module.exports = router;
