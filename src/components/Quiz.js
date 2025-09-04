import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveQuiz } from "../utils/localStorage";
import "../styles/spaceXTheme.css";

// Fisher-Yates shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`)
      .then(res => res.json())
      .then(data => {
        if (!data || data.response_code !== 0 || !data.results) {
          // Handle API error or empty data
          setQuestions([]);
          return;
        }
        const processed = data.results.map(q => ({
          ...q,
          options: shuffle([q.correct_answer, ...q.incorrect_answers])
        }));
        setQuestions(processed);
      })
      .catch(error => {
        console.error("Fetch failed:", error);
        setQuestions([]);
      });
  }, [category]);


  if (!questions.length || !questions[0].options) {
    return <div className="quiz-loading" style={{ color: "white" }}>Loading...</div>;
  }

  const q = questions[current];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      saveQuiz({ questions, answers: newAnswers, timestamp: Date.now(), category });
      navigate("/result", { state: { questions, answers: newAnswers } });
    }
  };

  return (
    <div className="quiz-bg">
      <h2 dangerouslySetInnerHTML={{ __html: q.question }} />
      <div className="options">
        {q.options.map(opt => (
          <button
            key={opt}
            className="quiz-btn"
            onClick={() => handleAnswer(opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      <span className="progress">
        {current + 1} / {questions.length}
      </span>
    </div>
  );
}
