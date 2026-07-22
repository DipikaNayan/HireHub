const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const path = require("path");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Profile Fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phone, bio, skills, linkedin, github, portfolio } =
      req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({
          message: "email already exists",
        });
      }
      user.email = email;
    }

    if (phone) {
      user.phone = phone;
    }
    if (bio) {
      user.bio = bio;
    }

    if (skills) {
      user.skills = skills;
    }

    if (linkedin) {
      user.linkedin = linkedin;
    }

    if (github) {
      user.github = github;
    }

    if (portfolio) {
      user.portfolio = portfolio;
    }
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
        skills: user.skills,
        linkedin: user.linkedin,
        github: user.github,
        portfolio: user.portfolio,
        profilePicture: user.profilePicture,
        resume: user.resume,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a pdf resume",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: " User not found",
      });
    }
    if (!user.resume) {
      return res.status(400).json({
        message: "No resume found",
      });
    }

    user.resume = "";
    await user.save();

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadResume,
  deleteResume,
};
