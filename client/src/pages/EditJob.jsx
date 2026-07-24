import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    description: "",
    requirements: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);

      setFormData({
        title: res.data.job.title,
        company: res.data.job.company,
        location: res.data.job.location,
        salary: res.data.job.salary,
        experience: res.data.job.experience,
        jobType: res.data.job.jobType,
        description: res.data.job.description,
        requirements: res.data.job.requirements,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/jobs/${id}`, formData);

      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 space-y-4"
      >
        <h1 className="text-3xl font-bold">Edit Job</h1>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
          rows={4}
        />

        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Requirements"
          className="w-full border p-3 rounded-lg"
          rows={4}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
