import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CategoryActions from "./components/CategoryActions";
import Quiz from "./components/Quiz";
import TrackRecord from "./components/TrackRecord";
import Result from "./components/Result";

import categoryNames from "./utils/categoryNames.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category" element={<CategoryActions />} />
        <Route path="/quiz/:category/start" element={<Quiz />} />
        <Route path="/quiz/:category/history" element={<TrackRecord />} />
        <Route path="/result" element={<Result />} />
        <Route path="/track" element={<TrackRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
