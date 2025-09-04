import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveQuiz } from "../utils/localStorage";

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
    <div className="min-h-screen flex flex-col items-center justify-center text-White font-orbitron p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-10" dangerouslySetInnerHTML={{ __html: q.question }} />
      <div className="grid grid-cols-1 gap-6 w-full">
        {q.options.map(opt => (
          <button
            key={opt}
            className="bg-transparent text-white border border-white px-6 py-3 text-xl transition duration-300 hover:bg-white hover:text-black hover:border-white-600"
            onClick={() => handleAnswer(opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      <span className="text-White mt-8 text-lg">
        {current + 1} / {questions.length}
      </span>
    </div>
  );
}
