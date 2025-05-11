import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, HeartPulse, Shield, Users } from 'lucide-react';
import AboutLogo from '../assets/sahaj.png';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center">
            <img className="h-50 -mt-10" src={AboutLogo} alt="logo" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">About SAHAJ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing healthcare through artificial intelligence, making personalized health insights accessible to everyone.
          </p>
        </motion.div>

        {/* Mission section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-blue-50 rounded-lg shadow-lg p-8 mb-12 transform hover:scale-105 transition duration-500"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At SAHAJ, we're on a mission to transform healthcare by leveraging the power of artificial intelligence to provide personalized, accessible, and proactive health guidance. We believe that everyone deserves access to high-quality health insights that can help them lead healthier, happier lives.
          </p>
          <p className="text-gray-600">
            We're committed to creating a future where healthcare is preventative rather than reactive, where each person receives care tailored to their unique needs, and where the latest advances in medical science are accessible to all through intuitive AI interfaces.
          </p>
        </motion.div>

        {/* Problem statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-6">The Problem We're Solving</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[ 
              {
                title: "Healthcare Accessibility",
                description: "Millions of people worldwide lack access to quality healthcare due to geographical barriers, high costs, or shortage of healthcare professionals. Med.ai bridges this gap by providing AI-powered health guidance that's available 24/7 from anywhere.",
              },
              {
                title: "Reactive vs. Preventative Care",
                description: "Traditional healthcare systems often focus on treating conditions after they develop, rather than preventing them. Med.ai shifts the paradigm by helping users identify potential health risks early and suggesting preventative measures.",
              },
              {
                title: "Information Overload",
                description: "The internet is flooded with health information, much of it contradictory or unreliable. Med.ai cuts through the noise by providing evidence-based, personalized health guidance drawn from reliable medical sources.",
              },
              {
                title: "One-Size-Fits-All Approaches",
                description: "Everyone's body is different, yet many health recommendations don't account for individual variations. Med.ai learns from your unique health data to provide truly personalized guidance tailored to your specific needs.",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-500"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Our Core Values</h2>

          <div className="space-y-6">
            {[ 
              {
                icon: <Brain className="text-blue-600" />,
                title: "Innovation",
                description: "We're constantly pushing the boundaries of what's possible with AI in healthcare, developing cutting-edge solutions to complex health challenges."
              },
              {
                icon: <Shield className="text-blue-600" />,
                title: "Privacy & Security",
                description: "We maintain the highest standards of data privacy and security, ensuring that your sensitive health information is always protected."
              },
              {
                icon: <Users className="text-blue-600" />,
                title: "Accessibility",
                description: "We're committed to making high-quality health guidance accessible to everyone, regardless of location, background, or economic status."
              },
              {
                icon: <HeartPulse className="text-blue-600" />,
                title: "Empathy",
                description: "We approach healthcare with compassion and understanding, recognizing that behind every data point is a human being with unique needs and concerns."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                className="flex items-start bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-500"
              >
                <div className="flex-shrink-0 p-2 mr-4">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[ 
              {
                name: "Gaurav Parmar",
                role: "Frontend Developer",
                bio: "Specializing in modern web technologies and user interface development, Aarav ensures that Med.ai's platform is intuitive, responsive, and visually engaging across all devices."
              },
              {
                name: "Rajeev Raghuwanshi",
                role: "Backend Developer",
                bio: "An expert in building secure and scalable server-side applications, Rajeev develops the robust infrastructure that powers Med.ai’s real-time data processing and integration with external health systems."
              },
              {
                name: "Shubham kushwaha",
                role: "Data Model Engineer",
                bio: "With deep expertise in data science and predictive modeling, he crafts intelligent algorithms that power Med.ai’s personalized health recommendations and risk assessments.."
              },
              {
                name: "Yashika Sharmar",
                role: "Backend Developer",
                bio: "She focuses on API development, database optimization, and system performance to ensure seamless interactions between users and Med.ai’s core services."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-500"
              >
                <div className="w-16 h-16 bg-blue-300 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-gray-500 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg p-8 text-center shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Join Us in Revolutionizing Healthcare</h2>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Experience the future of personalized healthcare with Med.ai. Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-transparent hover:bg-blue-700 border border-white text-white font-medium rounded-md transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;
