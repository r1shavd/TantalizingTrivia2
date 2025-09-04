import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/spaceXTheme.css';

const categories = [
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Computer Science" },
  { id: 22, name: "Geography" }
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="quiz-bg">
      <h1 className="quiz-title">Tantalizing Trivia</h1>
      <div className="category-list">
        {categories.map(c =>
          <button
            key={c.id}
            className="quiz-btn"
            onClick={() => navigate(`/quiz/${c.id}`)}
          >
            {c.name}
          </button>
        )}
      </div>
      <button className="quiz-btn" onClick={() => navigate('/track')}>View Track Record</button>
    </div>
  );
}
