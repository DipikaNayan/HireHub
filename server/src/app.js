const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);

module.exports = app;
