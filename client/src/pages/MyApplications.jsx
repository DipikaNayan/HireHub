import { useEffect, useState } from "react";
import api from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/my");
      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold">{item.job.title}</h2>

              <p>{item.job.company}</p>

              <p>{item.job.location}</p>

              <p className="text-blue-600 font-semibold">
                Status : {item.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
