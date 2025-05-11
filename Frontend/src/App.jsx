import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";   // ⬅️ add useLocation
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import InteractionPage from "./pages/InteractionPage";
import AiAssistant from "./pages/AiAssistant";
import AiHome from "./pages/AiHome";
import IoT from "./pages/IOT";
import Chatbot from "./components/Chatbot";

const App = () => {
  const location = useLocation();                    // 🔍 current route
  const hideNav = location.pathname === "/interactionpage";

  return (
    <div>
      {/* show navbar/footer everywhere *except* /interactionpage */}
      {!hideNav && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/interactionpage" element={<InteractionPage />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route path="/aiassistant" element={<AiAssistant />} />
        <Route path="/aihome" element={<AiHome />} />
        <Route path="/iot" element={<IoT />} />
      </Routes>

      {!hideNav && <Footer />}

      {/* chatbot stays on every page; remove if you also want it hidden */}
      <Chatbot />
    </div>
  );
};

export default App;
