import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TestPage from "./testPage";
import "./style.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/testpage" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
