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
      const newQuestion = document.createElement("p");
      const answerSpan = document.createElement("span");

      newQuestion.textContent = decode(quiz.question) + "\n";

      const allAnswers = [...quiz.incorrect_answers];
      allAnswers.push(quiz.correct_answer);
      shuffle(allAnswers);
      allAnswers.forEach((answer) => {
        answerSpan.textContent += decode(answer) + " ---  ";
      });
      quizzBlock.append(newQuestion, answerSpan);
    });
  }

  // handle decode special characters
  function decode(str) {
    let txt = document.createElement("textarea");

    txt.innerHTML = str;

    return txt.value;
  }
  // shuffle answers
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  getQuestions(handleQuestionDisplay);
  return <div className="test"></div>;
}

export default TestPage;
