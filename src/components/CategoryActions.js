import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryNames from "../utils/categoryNames.json";

export default function CategoryActions() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-White font-orbitron p-6">
      <h2 className="text-5xl tracking-widest mb-12">{categoryNames[category] || "Quiz Category"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 w-full max-w-4xl">
        <button
          className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 hover:bg-white hover:text-black hover:border-white-600"
          onClick={() => navigate(`/quiz/${category}/start`)}
        >
          Start New Quiz
        </button>
        <button
          className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 hover:bg-white hover:text-black hover:border-white-600"
          onClick={() => navigate(`/quiz/${category}/history`)}
        >
          View History
        </button>
        <button className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 hover:bg-white hover:text-black hover:border-white-600" onClick={() => navigate("/")}>
          Back to Categories
        </button>
      </div>
    </div>
  );
}
