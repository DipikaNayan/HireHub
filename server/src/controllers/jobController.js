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

const getAllJobs = async (req, res) => {
  try {
    //const { keyword } = req.query;
    const {
      keyword,
      location,
      jobType,
      experience,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    let filter = {};
    if (keyword) {
      filter = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const totalJobs = await Job.countDocuments(filter);
    let sortOption = { createdAt: -1 };

    if (sort === "salary") {
      sortOption = { salary: -1 };
    }

    if (sort === "latest") {
      sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      message: "Jobs fetched successfully",
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate(
      "recruiter",
      "fullName email role",
    );
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    console.log("ID:", req.params.id);
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json({
      message: " Job deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMyJobs = async (req, res) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      message: "Access denied. Recruiters only.",
    });
  }
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({
      recruiter: recruiterId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
};
