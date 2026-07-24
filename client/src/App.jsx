import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import MyApplications from "./pages/MyApplications";
import SavedJobs from "./pages/SavedJobs.jsx";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob.jsx";
import EditJob from "./pages/EditJob.jsx";
import Applicants from "./pages/Applicants.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="candidate">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute allowedRole="candidate">
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute allowedRole="candidate">
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-job"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CreateJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicants/:jobId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
