import React, { useState } from 'react';

const TalkToSakhiButton = () => {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setShowIframe(true)}
        className="fixed bottom-10 right-10 w-64 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl active:scale-95 animate-pulse animate-glowEffect z-40"
      >
        Talk to Sakhi
      </div>

      {/* Sidebar iFrame */}
      <div
        className={`fixed top-0 right-0 h-full w-[376px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showIframe ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '100vh' }}
      >
        <div className="relative h-full">
          <iframe
            src="https://dashboard.vapi.ai/assistants/8a200cae-76a8-4171-8b77-e03bc285e024"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="microphone; camera"
            title="Talk to Sakhi"
          ></iframe>
          <button
            onClick={() => setShowIframe(false)}
            className="absolute top-2 left-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center font-bold z-50"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }

          @keyframes glowEffect {
            0% {
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
            }
            50% {
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6);
            }
            100% {
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
            }
          }
        `}
      </style>
    </>
  );
};

export default TalkToSakhiButton;
