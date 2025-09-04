import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizHistory } from "../utils/localStorage";
import categoryNames from "../utils/categoryNames.json";

export default function TrackRecord() {
  const { category } = useParams();
  const navigate = useNavigate();

  const history = getQuizHistory().filter(h => String(h.category) === category);

  return (
    <div className="min-h-screen bg-Dark flex flex-col items-center justify-center text-White font-orbitron p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-8">Quiz History - {categoryNames[category] || "Unknown Category"}</h2>
      {history.length === 0 ? (
        <div>No quizzes taken yet for this category.</div>
      ) : (
        <table className="w-full border border-White text-center">
          <thead>
            <tr className="border-b border-White">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, i) => {
              const score = entry.answers.filter((a, idx) => a === entry.questions[idx].correct_answer).length;
              return (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-3 px-4">{new Date(entry.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4">{score} / {entry.questions.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button
        className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 mt-10 hover:bg-white hover:text-black hover:border-white-600"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}
