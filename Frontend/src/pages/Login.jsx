import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          email: credentials.identifier,
          password: credentials.password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response.data.token || "dummy");
      localStorage.setItem("user", credentials.identifier);

      alert("Login successful!");
      navigate("/interactionpage");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login using your username or email
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="identifier"
            placeholder="Username or Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={credentials.identifier}
            onChange={handleChange}
            required
          />
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Signup here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
