import React from "react";
import { useNavigate } from "react-router-dom";

import categoryNames from "../utils/categoryNames.json";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-White font-orbitron p-6">
      <h1 className="text-5xl tracking-widest mb-12">Tantalizing Trivia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 w-full max-w-4xl">
        {Object.entries(categoryNames).map(([id, name]) => (
          <button
            key={id}
            onClick={() => navigate(`/quiz/${id}`)}
            className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 hover:bg-white hover:text-black hover:border-white-600"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
