import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

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
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[10px]">
        <p className="capitalize text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          book appointment <br className="hidden sm:block" /> with trusted doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.
          </p>
        </div>
        <button
          onClick={handleBookClick}
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </button>
      </div>

      <div className="md:w-1/2 relative">
        <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
