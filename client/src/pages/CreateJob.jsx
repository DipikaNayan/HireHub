import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/jobs/create", formData);

      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-8">Create Job</h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
          rows="3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
