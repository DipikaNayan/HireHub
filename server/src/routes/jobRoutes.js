const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.post("/create", verifyToken, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

module.exports = router;
