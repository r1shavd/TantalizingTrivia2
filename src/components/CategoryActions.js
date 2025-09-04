import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const categoryNames = {
  17: "Science & Nature",
  18: "Computer Science",
  22: "Geography",
};

export default function CategoryActions() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div className="quiz-action-screen">
      <h2>{categoryNames[category] || "Quiz Category"}</h2>
      <button
        className="quiz-btn"
        onClick={() => navigate(`/quiz/${category}/start`)}
      >
        Start New Quiz
      </button>
      <button
        className="quiz-btn"
        onClick={() => navigate(`/quiz/${category}/history`)}
      >
        View History
      </button>
      <button className="quiz-btn" onClick={() => navigate("/")}>
        Back to Categories
      </button>
    </div>
  );
}
