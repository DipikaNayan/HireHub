const Job = require("../models/job.js");

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      experience,
      jobType,
      description,
      requirements,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !experience ||
      !description
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }
    const job = await Job.create({
      title,
      company,
      location,
      salary,
      experience,
      jobType,
      description,
      requirements,
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { createJob };
