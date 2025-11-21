import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRegisterForm((old) => ({
      ...old,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
    
      .post("http://localhost:8080/register", {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      })
      .then((response) => {
        if (response.data) {
          alert("Registration Successful!");
          setRegisterForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Create an Account ✨
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">Full Name</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaUser className="text-white/70 mx-2" />
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">Email</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaEnvelope className="text-white/70 mx-2" />
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">Password</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaLock className="text-white/70 mx-2" />
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">Confirm Password</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaLock className="text-white/70 mx-2" />
              <input
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white/80 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-white font-semibold underline hover:text-pink-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
