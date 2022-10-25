import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="start-screen">
      <h1 className="game-name">Quizzical test</h1>
      <div className="game-description">
        You need 5 correct answers to pass the test.
      </div>
      <Link to="/testpage">
        <button className="start-button btn btn-primary" href="/testpage">
          Start quiz
        </button>
      </Link>
    </div>
  );
}

export default Home;
