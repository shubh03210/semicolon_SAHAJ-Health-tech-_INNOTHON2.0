import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Aarav Singh",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    feedback: "Med.ai helped me detect a health issue early. The AI diagnosis is accurate and fast!"
  },
  {
    name: "Dr. Meera Patel",
    role: "Doctor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    feedback: "The telemedicine tools and patient history access make my work efficient and smooth."
  },
  {
    name: "Rohan Das",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    feedback: "I love the reminders and emergency alert system. It’s like having a doctor on call."
  }
];

export default function TestimonialsAndFAQ() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section className="bg-white text-gray-900 py-20 px-6">
      {/* Testimonials */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real feedback from our patients and doctors using Med.ai
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{t.role}</p>
              <div className="flex justify-center text-yellow-400 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 text-sm">"{t.feedback}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="bg-gray-100 p-4 rounded-xl">
            <summary className="font-semibold cursor-pointer">How accurate is the AI diagnosis?</summary>
            <p className="mt-2 text-sm text-gray-600">
              Our AI models are trained on vast datasets with a 98% accuracy rate validated by medical experts.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-xl">
            <summary className="font-semibold cursor-pointer">Is my data safe and private?</summary>
            <p className="mt-2 text-sm text-gray-600">
              Yes, all your health records and personal data are encrypted and stored securely.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-xl">
            <summary className="font-semibold cursor-pointer">Can I talk to a real doctor?</summary>
            <p className="mt-2 text-sm text-gray-600">
              Absolutely! Med.ai connects you with certified doctors via teleconsultation.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-xl">
            <summary className="font-semibold cursor-pointer">What if there's an emergency?</summary>
            <p className="mt-2 text-sm text-gray-600">
              Our IoT features alert your emergency contacts and local services instantly.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}