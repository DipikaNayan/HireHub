const Application = require("../models/application.js");
const Job = require("../models/job.js");
const Notification = require("../models/notification.js");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const candidateId = req.user.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    const existingApplication = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      candidate: candidateId,
      job: jobId,
    });
    const candidate = await user.findById(candidateId);

    await Notification.create({
      recipient: job.recruiter,
      sender: candidateId,
      message: `${candidate.fullName} applied for ${job.title}`,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const candidateId = req.user.id;

    const applications = await Application.find({
      candidate: candidateId,
    }).populate("job", "title company location salary experience jobType");

    res.status(200).json({
      message: "Applications fetched successfully",
      totalApplications: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can withdraw applications",
      });
    }

    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.candidate.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can withdraw only your own application",
      });
    }

    if (application.status === "Accepted") {
      return res.status(400).json({
        message: "Accepted application cannot be withdrawn",
      });
    }

    if (application.status === "Rejected") {
      return res.status(400).json({
        message: "Rejected application cannot be withdrawn",
      });
    }

    if (application.status === "Withdrawn") {
      return res.status(400).json({
        message: "Application already withdrawn",
      });
    }

    application.status = "Withdrawn";

    await application.save();

    res.status(200).json({
      message: "Application withdrawn successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    if (job.recruiter.toString() !== recruiterId) {
      return res.status(403).json({
        message: "You are not authorized to view applicants for this job",
      });
    }
    const applications = await Application.find({ job: jobId })
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Applicants fetched successfully",
      totalApplicants: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Shortlisted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.job.recruiter.toString() !== recruiterId) {
      return res.status(403).json({
        message: "You are not authorized to update this application",
      });
    }

    application.status = status;
    await application.save();

    const job = await Job.findById(application.job);

    await Notification.create({
      recipient: application.candidate,
      sender: req.user.id,
      message: `Your application for "${job.title}" has been ${application.status}.`,
    });

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  applyJob,
  getMyApplications,
  withdrawApplication,
  getApplicantsForJob,
  updateApplicationStatus,
};
