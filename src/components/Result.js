import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return null;

  const { questions, answers } = state;
  let score = 0;

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      {questions.map((q, i) => {
        const correct = q.correct_answer === answers[i];
        if (correct) score++;
        return (
          <div className={correct ? "correct" : "wrong"} key={i}>
            <div dangerouslySetInnerHTML={{ __html: q.question }} />
            <div>Your Answer: <span dangerouslySetInnerHTML={{ __html: answers[i] }} /></div>
            <div>Correct Answer: <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} /></div>
          </div>
        );
      })}
      <h3>Score: {score}/{questions.length}</h3>
      <button className="quiz-btn" onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
}
