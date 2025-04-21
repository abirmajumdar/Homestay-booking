import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthProvider"; // ✅ Import useAuth

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuth(); // ✅ Get setAuthUser from context

  const validateInputs = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    return true;
  };

  const loginForm = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const res = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      });

      const user = res.data.user;

      // ✅ Update localStorage & context
      localStorage.setItem("User", JSON.stringify(user));
      setAuthUser(user);

      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={loginForm} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="/register" className="text-sm text-indigo-600 hover:underline">
              Not registered?
            </a>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
