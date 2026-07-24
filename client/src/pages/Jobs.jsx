import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/jobs/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      console.log(res.data);

      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <h1 className="text-center mt-20 text-2xl">Loading Jobs...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Find Your Dream Job</h1>

        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-gray-500 text-lg">No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
