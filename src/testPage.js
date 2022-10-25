import React from "react";
function TestPage() {
  const triviaAPI = "https://opentdb.com/api.php?amount=5";
  // get data from api
  function getQuestions(callback) {
    fetch(triviaAPI)
      .then((data) => data.json())
      .then(callback);
  }

  function handleQuestionDisplay(data) {
    console.log(data);
    const quizzBlock = document.querySelector(".test");
    const quizz = data.results;
    quizz.forEach((quiz) => {
      const newP = document.createElement("p");
      // const newAnswer1 = document.createElement("span");
      // const newAnswer2 = document.createElement("span");
      // const newAnswer3 = document.createElement("span");
      // const newAnswer4 = document.createElement("span");

      newP.textContent = decode(quiz.question);
      quizzBlock.appendChild(newP);
    });
  }
  getQuestions(handleQuestionDisplay);
  return <div className="test"></div>;

  // handle decode special characters
  function decode(str) {
    let txt = document.createElement("textarea");

    txt.innerHTML = str;

    return txt.value;
  }
}

export default TestPage;
