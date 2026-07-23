import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import api from "../../services/api.js";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, password, confirmPassword, role } =
      formData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "candidate",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
      console.log("Response:", res.data);
    } catch (error) {
      console.log(error.response?.data || "Registration failed");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Create Account
      </h2>

      <p className="text-center text-gray-500 mt-2">
        Join HireHub and find your dream job.
      </p>

      <InputField
        label="Full Name"
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Phone Number"
        id="phone"
        name="phone"
        type="text"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <InputField
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <div className="mt-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Register As
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="candidate"
              checked={formData.role === "candidate"}
              onChange={handleChange}
            />
            Candidate
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={formData.role === "recruiter"}
              onChange={handleChange}
            />
            Recruiter
          </label>
        </div>
      </div>

      {/* Temporary Debug */}
      <pre className="mt-6 bg-gray-100 p-3 rounded text-xs overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-8 transition"
      >
        Create Account
      </button>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
