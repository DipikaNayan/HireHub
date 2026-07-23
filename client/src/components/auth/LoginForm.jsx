import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../common/InputField.jsx";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("please fill all fields");
      return;
    }
    try {
      const res = await api.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
      <p className="text-center text-gray-500 mt-2">
        Login to your HireHub account
      </p>
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
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        Login
      </button>
      <p className="text-center mt-6 text-gray-600">Don't have an account?</p>

      <Link to="/register" className="text-blue-600 font-semibold">
        Register
      </Link>
    </form>
  );
};

export default LoginForm;
