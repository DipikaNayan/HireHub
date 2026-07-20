const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/jobController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

router.post("/create", verifyToken, createJob);

module.exports = router;
