import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/applications/${id}/status`, {
        status,
      });

      toast.success(res.data.message);

      fetchApplicants();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold">{item.candidate?.fullName}</h2>

              <p>{item.candidate?.email}</p>

              <p className="mt-2 font-semibold">Status : {item.status}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => updateStatus(item._id, "Shortlisted")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Shortlist
                </button>

                <button
                  onClick={() => updateStatus(item._id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
