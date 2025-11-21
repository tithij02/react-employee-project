import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/login",
         {
        email: loginForm.email,
        password: loginForm.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.data) {
          // alert("Login Successful!");
          setLoginForm({ email: "", password: "" });
          navigate("/dashboard");
        } else {
          alert("Invalid Credentials!");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 401 || error.response.status === 403) {
            alert("Invalid Credentials! Please check your email and password.");
          } else if (error.response.status === 500) {
            alert("Server error. Please try again later.");
          } else {
            alert(`Login failed: ${error.response.data?.message || error.response.statusText || 'Please try again.'}`);
          }
        } else if (error.request) {
          // Request made but no response received
          alert("Network error. Please check your connection and try again.");
        } else {
          // Something else happened
          alert("Login failed. Please try again.");
        }
      });
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginForm((old) => ({
      ...old,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Welcome Back 👋
        </h2>

        <form onSubmit={login} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">
              Email
            </label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaEnvelope className="text-white/70 mx-2" />
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">
              Password
            </label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaLock className="text-white/70 mx-2" />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white/80 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-white font-semibold underline hover:text-pink-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
