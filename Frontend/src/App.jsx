import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments"; 
import Appointments from "./pages/Appointments"; // Ensure this is correct
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import InteractionPage from "./pages/InteractionPage"
import AiAssistant from "./pages/AiAssistant";
import AiHome from "./pages/AiHome";
import IoT from "./pages/IOT";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/interactionpage" element={<InteractionPage/>}/>
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route path="/aiassistant" element={<AiAssistant/>}/>
        <Route path="/aihome" element={<AiHome/>}/>
        <Route path="/iot" element={<IoT/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
