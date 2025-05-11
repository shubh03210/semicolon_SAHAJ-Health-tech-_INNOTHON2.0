import { useState, useEffect } from "react";
import { Home as HomeIcon, Bot, Menu } from "lucide-react";

// Import your existing components
import Home from "../pages/AiHome";
import AIAssistant from "../pages/AiAssistant";
import IoT from "../pages/IOT";
import MedicalHistory from "./MedicalHistory";
import { Link, useNavigate } from "react-router-dom";
import Doctors from "./Doctors";
import NewFeatures from "./NewFeatures";

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState("welcome");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const images = [
    {
      url: "https://img.freepik.com/free-vector/artificial-intelligence-flat-concept-with-robotic-helper-smartphone-happy-characters-scientists-user-vector-illustration_1284-84244.jpg?t=st=1746932177~~exp=1746935777~~hmac=a4ea5bf7fce81fd10a9a1010ff081605cfa82c51cdaf9a1f902548c3970a83a5&w=1800",
      caption: "Smart Healthcare with AI Integration",
    },
    {
      url: "https://th.bing.com/th/id/R.20d5496d847647b54cdb4c5898f1054d?rik=M1LJ7LOSKTbSFg&riu=http%3a%2f%2fwww.datapharm.com%2fmedia%2fnswbqc1z%2fshutterstock_1181716903-structured-data-2.jpg%3fwidth%3d921%26height%3d568%26rnd%3d133282761426300000&ehk=kgrs0fvzFOWyyIUVnit2U4kIGoXTjtCbC0kDtraI6pY%3d&risl=&pid=ImgRaw&r=0",
      caption: "Innovative Health Technologies",
    },
    {
      url: "https://www.helpwire.app/blog/wp-content/uploads/2021/12/iot-in-healthcare.jpg",
      caption: "Revolutionizing Healthcare with IoT",
    },
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
    telemedicine: <Doctors />,
    medical: <MedicalHistory />,
    welcome: (
      <div className="p-4 min-h-screen w-full text-gray-900 font-semibold flex flex-col items-center pt-14">
        <h1 className="text-5xl mb-16">👋 Welcome to SAHAJ!</h1>

        {/* Carousel */}
        <div className="relative w-full max-w-6xl h-[60vh] rounded-lg overflow-hidden shadow-lg">
          {/* Image */}
          <img
            src={images[currentSlide].url}
            alt="Carousel"
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

          {/* Caption */}
          <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-md">
            {images[currentSlide].caption}
          </div>

          {/* Navigation Controls */}
          <div
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
          >
            &#10094; {/* Left Arrow */}
          </div>
          <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
          >
            &#10095; {/* Right Arrow */}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 shadow-md border-r border-gray-400 p-4 transition-all duration-300 ${
          expanded ? "w-52" : "w-16"
        } rounded-r-xl`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full hover:bg-gray-400 transition duration-300"
          >
            <Menu className="text-gray-800" />
          </button>
        </div>

        {/* Home */}
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-400 hover:scale-[1.02] p-2 rounded transition-all duration-300"
          onClick={() => setPage("home")}
        >
          <HomeIcon />
          {expanded && <span className="font-semibold">Home</span>}
        </div>

        {/* AI Assistant */}
       <div
  className="flex items-center gap-2 cursor-pointer hover:bg-gray-400 hover:scale-[1.02] p-2 rounded transition-all duration-300"
  onClick={() => window.location.href = "http://localhost:8501/"}
>
  <Bot />
  {expanded && <span className="font-semibold">AI Diagnosis</span>}
</div>


        {/* Telemedicine */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-400 hover:scale-[1.02] p-2 rounded transition-all duration-300"
          onClick={() => setPage("telemedicine")}
        >
          <span className="text-xl">🩺</span>
          {expanded && <span className="font-semibold">Telemedicine</span>}
        </div>

        {/* IoT */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-400 hover:scale-[1.02] p-2 rounded transition-all duration-300"
          onClick={() => setPage("iot")}
        >
          <span className="text-xl">📡</span>
          {expanded && <span className="font-semibold">IoT</span>}
        </div>

        {/* Medical History */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-400 hover:scale-[1.02] p-2 rounded transition-all duration-300"
          onClick={() => setPage("medical")}
        >
          <span className="text-xl">📝</span>
          {expanded && <span className="font-semibold">Medical History</span>}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 bg-gray-300 overflow-auto p-6">{pages[page]}</div>
    </div>
  );
}
