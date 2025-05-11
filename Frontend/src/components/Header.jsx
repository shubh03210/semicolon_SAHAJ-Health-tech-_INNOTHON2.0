import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/interactionpage");
    } else {
      localStorage.setItem("redirectAfterLogin", "/interaction");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-indigo-100 rounded-xl p-6 md:p-10 lg:p-20 shadow-lg">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex flex-col justify-center gap-6 py-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-800 leading-tight">
          Book Appointment <br className="hidden sm:block" /> with Trusted Doctors
        </h1>

        <div className="flex items-center gap-4">
          <img className="w-20" src={assets.group_profiles} alt="Doctors" />
          <p className="text-indigo-700 text-sm">
            Browse our verified doctors <br /> and book appointments easily.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleBookClick}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 w-fit shadow hover:shadow-lg"
        >
          Book Appointment
          <img className="w-4 invert" src={assets.arrow_icon} alt="→" />
        </motion.button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex justify-center items-center"
      >
        <img
  className="w-full h-2xl max-w-5xl rounded-xl "
  src="https://img.freepik.com/premium-photo/close-up-smart-doctor-pointing-human-anatomy-hologram-floating-remedial_31965-667244.jpg?w=1480"
  alt="Doctor Illustration"
/>

      </motion.div>
    </div>
  );
};

export default Header;
