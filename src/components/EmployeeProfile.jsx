import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    axios
      .get(`https://django-employee-project.onrender.com/getById?id=${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => alert(error.message || 'Something went wrong'));
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee((old) => ({
      ...old,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (employee.password !== employee.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .put("https://django-employee-project.onrender.com/update", {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        password: employee.password
      })
      .then((response) => {
        if (response.data) {
          alert("Update Successful!");
          navigate('/dashboard');
        } else {
          alert("Update failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Update failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Update Employee ✨
        </h2>

        <form className="space-y-6" onSubmit={handleUpdate}>
          {/* ID */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">ID</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaUser className="text-white/70 mx-2" />
              <input
                type="number"
                name="id"
                value={employee.id}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                readOnly
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-white text-sm mb-1 font-semibold">Full Name</label>
            <div className="flex items-center bg-white/20 rounded-lg p-2 border border-white/30 focus-within:ring-2 focus-within:ring-purple-300">
              <FaUser className="text-white/70 mx-2" />
              <input
                type="text"
                name="name"
                value={employee.name}
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
                value={employee.email}
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
                value={employee.password}
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
                value={employee.confirmPassword}
                onChange={inputHandler}
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeProfile;
