export const saveQuiz = (data) => {
  let history = JSON.parse(localStorage.getItem("quiz_history")) || [];
  history.push(data);
  localStorage.setItem("quiz_history", JSON.stringify(history));
};

export const getQuizHistory = () => {
  return JSON.parse(localStorage.getItem('quiz_history')) || [];
};
