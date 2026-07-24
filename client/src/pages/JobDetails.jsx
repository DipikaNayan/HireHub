import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJob();
    if (user) {
      checkApplied();
    } else {
      setApplied(false);
    }
  }, [id, user]);

  const checkApplied = async () => {
    try {
      const res = await api.get(`/applications/check/${id}`);

      setApplied(res.data.applied);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log(error);
      }
    }
  };

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);

      console.log(res.data);

      setJob(res.data.job);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await api.post(`/applications/${id}`);

      toast.success(res.data.message);

      setApplied(true);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      toast.error(error.response?.data?.message || "Application failed");
    }
  };
  if (loading) {
    return <h1 className="text-center mt-20 text-2xl">Loading...</h1>;
  }

  if (!job) {
    return <h1 className="text-center mt-20 text-2xl">Job Not Found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>

        <p className="text-xl text-gray-600 mt-2">{job.company}</p>

        <div className="flex gap-3 mt-5 flex-wrap">
          <span className="bg-blue-100 px-3 py-1 rounded-full">
            📍 {job.location}
          </span>

          <span className="bg-green-100 px-3 py-1 rounded-full">
            💼 {job.jobType}
          </span>

          <span className="bg-purple-100 px-3 py-1 rounded-full">
            ⭐ {job.experience}
          </span>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Salary</h2>

        <p className="text-blue-600 font-bold text-2xl">₹ {job.salary}</p>

        <h2 className="mt-8 text-xl font-semibold">Job Description</h2>

        <p className="text-gray-700 mt-2">{job.description}</p>

        <button
          onClick={handleApply}
          disabled={applied}
          className={`mt-8 px-6 py-3 rounded-lg text-white ${
            applied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {applied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
