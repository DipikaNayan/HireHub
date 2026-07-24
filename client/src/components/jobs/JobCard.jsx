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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6">
      <h3 className="text-xl font-semibold">{job.title}</h3>

      <p className="text-gray-600 mt-2">{job.company}</p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          📍 {job.location}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          💼 {job.jobType}
        </span>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
          ⭐ {job.experience}
        </span>
      </div>

      {/* <div className="mt-5 flex justify-between items-center">
        <p className="font-bold text-lg text-blue-600">₹ {job.salary}</p>

        <Link
          to={`/jobs/${job._id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div> */}

      <div className="mt-5 flex justify-between items-center">
        <p className="font-bold text-lg text-blue-600">₹ {job.salary}</p>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>

          <Link
            to={`/jobs/${job._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
