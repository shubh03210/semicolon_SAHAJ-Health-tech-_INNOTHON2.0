import React, { useEffect } from "react";
import { FaDna, FaBrain, FaPills, FaAmbulance } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import CountUp from "react-countup";
import "aos/dist/aos.css";

const features = [
  {
    icon: <FaDna className="text-blue-600 text-4xl mb-4" />,
    title: "AI Diagnosis Model",
    description:
      "AI uses your genetic data to provide risk assessments and personalized health advice.",
    link: "/diagnosis",
  },
  {
    icon: <FaBrain className="text-blue-600 text-4xl mb-4" />,
    title: "Telemedicine App",
    description:
      "Receive personalized meditation and mental wellness routines based on mood tracking.",
    link: "/doctors",
  },
  {
    icon: <FaPills className="text-blue-600 text-4xl mb-4" />,
    title: "Medical History",
    description:
      "Track medications, receive reminders, and get alerts for potential interactions.",
    link: "/history",
  },
  {
    icon: <FaAmbulance className="text-blue-600 text-4xl mb-4" />,
    title: "IOT Emergency Alerts",
    description:
      "AI detects emergency conditions and notifies your contacts immediately.",
    link: "/iot",
  },
];

export default function NewFeatures() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-white text-gray-900">
      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">New Features</h2>
        <p className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto leading-relaxed">
          Discover the advanced tools Med.ai offers using artificial intelligence to
          empower your health decisions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <Link to={feature.link || "#"} key={index} className="h-full">
              <div
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-blue-200 transition-shadow cursor-pointer h-full flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-2 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <span className="text-blue-600 font-medium hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div data-aos="zoom-in">
            <h3 className="text-5xl font-bold text-blue-600">
              <CountUp end={10000} duration={3} />+
            </h3>
            <p className="text-gray-700 mt-3 text-base">Diagnoses Completed</p>
          </div>
          <div data-aos="zoom-in" data-aos-delay="100">
            <h3 className="text-5xl font-bold text-blue-600">
              <CountUp end={5000} duration={3} />+
            </h3>
            <p className="text-gray-700 mt-3 text-base">Verified Doctors</p>
          </div>
          <div data-aos="zoom-in" data-aos-delay="200">
            <h3 className="text-5xl font-bold text-blue-600">
              <CountUp end={98} duration={3} />%
            </h3>
            <p className="text-gray-700 mt-3 text-base">Accuracy Rate</p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-blue-600 text-white text-center py-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to experience AI-powered healthcare?</h2>
        <p className="text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Join Med.ai today and start your intelligent health journey with advanced features and real-time assistance.
        </p>
        <Link to="/signup">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Create Account
          </button>
        </Link>
      </div>
    </section>
  );
}
