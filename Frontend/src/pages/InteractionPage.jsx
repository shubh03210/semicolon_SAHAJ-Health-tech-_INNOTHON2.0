import { useState, useEffect } from "react";
import { Home as HomeIcon, Bot, Menu } from "lucide-react";

// Import your existing components
import Home from "../pages/AiHome";
import AIAssistant from "../pages/AiAssistant";
import IoT from "../pages/IOT";
import MedicalHistory from "./MedicalHistory";
import { useNavigate } from "react-router-dom";
import Doctors from "./Doctors";

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState("welcome");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const images = [
    "https://img.freepik.com/free-vector/smart-healthcare-digital-health-flat-composition-text-gear-icons-images-gadgets-artificial-intelligence-vector-illustration_98292-9063.jpg?semt=ais_hybrid&w=740",
    "https://d12aarmt01l54a.clo/udfront.net/cms/images/Media-20220422144416/1200-630.png",
    "https://images.yourstory.com/cs/2/f02aced0d86311e98e0865c1f0fe59a2/digital-healthcare-1617709572074-1626296926080.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pages = {
    home: <Home />, 
    ai: <AIAssistant />, 
    iot: <IoT />, 
    telemedicine: <Doctors/>, 
    medical: <MedicalHistory />,
    welcome: (
      <div className="p-4 min-h-screen w-full bg-[#ffffff] text-gray-900 font-semibold flex flex-col items-center pt-14">
        <h1 className="text-4xl mb-8">👋 Hello Welcome to SAHAJ!</h1>

        {/* Carousel */}        
      </div>
    ),
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#f1f3f5] text-gray-900 border-r border-gray-300 p-4 transition-all duration-300 ${
          expanded ? "w-48" : "w-16"
        }`}
      >
        <button onClick={() => setExpanded(!expanded)} className="mb-6">
          <Menu />
        </button>

        {/* Home */}
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-[#e9ecef] p-2 rounded"
          onClick={() => setPage("home")}
        >
          <HomeIcon />
          {expanded && <span>Home</span>}
        </div>

        {/* AI Assistant */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-[#e9ecef] p-2 rounded"
          onClick={() => setPage("ai")}
        >
          <Bot />
          {expanded && <span>AI Assistant</span>}
        </div>

        {/* Telemedicine */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-[#e9ecef] p-2 rounded"
          onClick={() => setPage('telemedicine')}
        >
          <span className="text-lg">🩺</span>
          {expanded && <span>Telemedicine</span>}
        </div>

        {/* IoT */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-[#e9ecef] p-2 rounded"
          onClick={() => setPage("iot")}
        >
          <span className="text-lg">📡</span>
          {expanded && <span>IoT</span>}
        </div>

        {/* Medical History */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-[#e9ecef] p-2 rounded"
          onClick={() => setPage("medical")}
        >
          <span className="text-lg">📝</span>
          {expanded && <span>Medical History</span>}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 bg-[#ffffff] overflow-auto">{pages[page]}</div>
    </div>
  );
}
