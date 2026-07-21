const Job = require("../models/job.js");
const Application = require("../models/application.js");

const getRecruiterDashboard = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Access denied, Recruiters only",
      });
    }
    const recruiterId = req.user.id;

    const jobs = await Job.find({
      recruiter: recruiterId,
    });

    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const pendingApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Pending",
    });
    const shortlistedApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Shortlisted",
    });
    const rejectedApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Rejected",
    });
    res.status(200).json({
      totalJobs: jobs.length,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      rejectedApplications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getCandidateDashboard = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Access denied. Candidates only",
      });
    }

    const candidateId = req.user.id;

    const totalApplications = await Application.countDocuments({
      candidate: candidateId,
    });
    const pendingApplications = await Application.countDocuments({
      candidate: candidateId,
      status: "Pending",
    });

    const shortlistedApplications = await Application.countDocuments({
      candidate: candidateId,
      status: "Shortlisted",
    });

    const rejectedApplications = await Application.countDocuments({
      candidate: candidateId,
      status: "Rejected",
    });

    res.status(200).json({
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      rejectedApplications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = { getRecruiterDashboard, getCandidateDashboard };
