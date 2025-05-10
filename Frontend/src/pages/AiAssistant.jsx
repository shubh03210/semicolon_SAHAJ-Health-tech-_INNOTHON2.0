import React, { useState } from "react";

const AiAssistant = ({ user = "Gaurav" }) => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white px-6 py-10">
      <h1 className="text-3xl text-center font-semibold mb-2">
        Good evening, {user}.
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">
        How can I help you today?
      </p>

      <div className="max-w-3xl mx-auto bg-[#1A1C23] p-6 rounded-lg">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Please upload the"
          className="w-full bg-transparent border border-gray-600 p-4 rounded-md resize-none mb-4 text-white"
          rows="3"
        ></textarea>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <span className="bg-[#2A2D3A] hover:bg-[#353945] px-4 py-2 rounded">
              📎 Upload Image
            </span>
          </label>

          <button className="bg-gray-700 hover:bg-blue-700 px-5 py-2 rounded-full font-extrabold text-3xl  cursor-pointer">
          ↑
          </button>
        </div>

        {image && (
          <div className="mt-6 relative inline-block">
            <img
              src={image}
              alt="preview"
              className="w-40 rounded shadow border border-gray-700"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              title="Remove image"
            >
              ❌
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
