import React from "react";
function TestPage() {
  const triviaAPI = "https://opentdb.com/api.php?amount=5";
  // get data from api
  function getQuestions(callback) {
    fetch(triviaAPI)
      .then((data) => data.json())
      .then(callback);
  }
  // handle questions displaying
  function handleQuestionDisplay(data) {
    console.log(data);
    const quizzBlock = document.querySelector(".test");
    const quizz = data.results;
    quizz.forEach((quiz) => {
      const questionContainer = document.createElement("div");
      const questionContent = document.createElement("p");
      const answersContent = document.createElement("div");
      const lines = document.createElement("hr");
      questionContainer.classList.add("question-container");
      // questionContent.setAttribute(
      //   "id",
      //   `question-number-${quizz.indexOf(quiz) + 1}`
      // );
      // answersContent.classList.add("answers-container");

      // questionContent.textContent = decode(quiz.question) + "\n";

      const allAnswers = [...quiz.incorrect_answers];
      allAnswers.push(quiz.correct_answer);
      shuffle(allAnswers);
      //display answers
      answersContent.innerHTML = allAnswers
        .map(
          (answer) => `<div>
        <input type="radio" name="answer" value="${answer}" id="question-${quizz.indexOf(
            quiz
          )}--answer-${allAnswers.indexOf(answer)}">
         <label for="question-${quizz.indexOf(
           quiz
         )}--answer-${allAnswers.indexOf(answer)}">${answer}</label>
    </div>`
        )
        .join(" ");
      const radioButtons = document.querySelectorAll('input[name="answer"]');
      for (const radioButton of radioButtons) {
        radioButton.addEventListener("change", handleSelectAnswer);
      }

      questionContainer.append(questionContent, answersContent);
      quizzBlock.append(questionContainer, lines);
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
  // handle select answer
  function handleSelectAnswer(e) {
    // console.log(e);
    if (this.checked) {
      console.log("run");
    }
  }
  getQuestions(handleQuestionDisplay);
  return <div className="test"></div>;
}

export default TestPage;
