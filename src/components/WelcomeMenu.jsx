import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      {/* Brand */}
      <div className="text-3xl font-extrabold text-white cursor-pointer transform hover:scale-110 transition duration-300 ease-in-out">
        Employee Dashboard
      </div>

      {/* Login & Register */}
      <div className="flex items-center space-x-4">
        <Link
          to={"/login"}
          className="text-white font-semibold px-5 py-2 rounded-full border border-white
                     hover:bg-white hover:text-blue-600 transition-all duration-300
                     shadow-md hover:shadow-xl transform hover:scale-110"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="text-blue-600 font-semibold px-5 py-2 rounded-full bg-white
                     hover:bg-blue-600 hover:text-white transition-all duration-300
                     shadow-md hover:shadow-xl transform hover:scale-110"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
