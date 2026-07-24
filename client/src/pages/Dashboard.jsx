import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get("/jobs/my");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/jobs/${id}`);

      toast.success(res.data.message);

      fetchMyJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-2xl font-bold">{job.title}</h2>

              <p>{job.company}</p>

              <p>{job.location}</p>

              <p className="text-blue-600 font-bold">₹ {job.salary}</p>

              <div className="flex gap-3 mt-5">
                <Link
                  to={`/applicants/${job._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Applicants
                </Link>
                <Link
                  to={`/edit-job/${job._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
