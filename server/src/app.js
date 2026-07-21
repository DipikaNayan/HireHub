const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;
