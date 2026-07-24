import JobCard from "../jobs/JobCard.jsx";
import { useEffect, useState } from "react";
import api from "../../services/api.js";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");

      // sirf first 6 jobs
      setJobs(res.data.jobs.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Featured Jobs</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
