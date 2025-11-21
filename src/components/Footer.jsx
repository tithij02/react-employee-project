import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-indigo-700 text-white py-6 mt-2">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-xl font-bold">Employee Dashboard</div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300 transition">Home</a>
          <a href="#" className="hover:text-gray-300 transition">About</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:scale-110 transition transform">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="hover:scale-110 transition transform">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:scale-110 transition transform">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:scale-110 transition transform">
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs opacity-75 mt-3">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
