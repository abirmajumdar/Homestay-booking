import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const { name, email, password, cnfpassword } = formData;
    const newErrors = {};

    if (!name || name.length < 1) {
      newErrors.name = "Name must be at least 1 character long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password || password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    if (password !== cnfpassword) {
      newErrors.cnfpassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("User", JSON.stringify(res.data.user));
      toast.success("Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Cross icon for closing */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              name="name"
              type="text"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-400"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              name="password"
              type="password"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              name="cnfpassword"
              type="password"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-400"
              value={formData.cnfpassword}
              onChange={handleChange}
            />
            {errors.cnfpassword && <p className="text-sm text-red-500 mt-1">{errors.cnfpassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
