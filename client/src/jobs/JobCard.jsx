import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await api.post(`/jobs/save/${job._id}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save job");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600 mt-2">{job.company}</p>
      <p text-gray-500>{job.location}</p>

      <p className="text-blue-600 font-semibold mt-2">{job.salary}</p>

      <Link
        to={`/jobs/${job.id}`}
        className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
      <button
        onClick={handleSave}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </div>
  );
};

export default JobCard;
