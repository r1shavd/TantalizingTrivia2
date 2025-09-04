import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizHistory } from "../utils/localStorage";
import "../styles/spaceXTheme.css";

export default function TrackRecord() {
  const { category } = useParams();
  const navigate = useNavigate();

  const history = getQuizHistory().filter(h => String(h.category) === category);

  return (
    <div className="quiz-history">
      <h2>Quiz History - {category}</h2>
      {history.length === 0 ? (
        <div>No quizzes taken yet for this category.</div>
      ) : (
        <ul>
          {history.map((entry, i) => (
            <li key={i}>
              Quiz on {new Date(entry.timestamp).toLocaleString()} — Score:{" "}
              {
                entry.answers.filter((a, idx) => a === entry.questions[idx].correct_answer)
                  .length
              }
              /{entry.questions.length}
            </li>
          ))}
        </ul>
      )}
      <button className="quiz-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
