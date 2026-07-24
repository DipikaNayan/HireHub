import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get("/jobs/saved");
      console.log(res.data);

      setSavedJobs(res.data.savedJobs);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    try {
      const res = await api.delete(`/jobs/saved/${jobId}`);

      toast.success(res.data.message);

      setSavedJobs((prev) => prev.filter((item) => item.job._id !== jobId));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to remove saved job",
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-2xl">Loading Saved Jobs...</h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500 text-lg">No saved jobs found.</p>
      ) : (
        <div className="space-y-6">
          {savedJobs.map((item) => (
            <div key={item._id} className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold">{item.job.title}</h2>

              <p className="text-gray-600 mt-2">{item.job.company}</p>

              <p className="mt-2">📍 {item.job.location}</p>

              <p className="mt-2 text-blue-600 font-semibold">
                ₹ {item.job.salary}
              </p>

              <button
                onClick={() => handleRemove(item.job._id)}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
