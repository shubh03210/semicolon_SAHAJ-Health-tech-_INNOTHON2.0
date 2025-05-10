import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react"; // Icon library
import sahajicon from "../assets/sahaj.png"
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/"; 
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 w-full">
      <Link to="/" className="text-3xl font-bold text-blue-600">
        {/* <img className="h-12 " src={sahajicon} alt="" /> */}
        <img className="h-20" src={sahajicon} alt="" />
      </Link>

      <div className="space-x-12 flex items-center justify-center flex-1">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">Home</Link>
        <Link to="/doctors" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">Doctors</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">Contact</Link>
      </div>

      <div className="space-x-4 flex items-center">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <UserCircle className="w-8 h-8 text-blue-600 hover:text-blue-800" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-lg font-medium">Login</Link>
            <Link to="/signup" className="bg-gray-100 text-blue-600 px-5 py-2 rounded-lg hover:bg-gray-200 transition text-lg font-medium">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
