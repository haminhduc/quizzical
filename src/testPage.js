import React from "react";
function TestPage() {
  const triviaAPI = "https://opentdb.com/api.php?amount=5";
  let score = 0;

  // get data from api
  function getQuestions(callback) {
    fetch(triviaAPI)
      .then((data) => data.json())
      .then(callback);
  }
  // handle quizz displaying
  function handleQuizzDisplay(data) {
    console.log(data);
    const quizzBlock = document.querySelector(".test");
    const quizz = data.results;
    //handle questions display
    quizz.forEach((quiz) => {
      const questionContent = document.createElement("p");
      const questionContainer = document.createElement("div");
      const answersContent = document.createElement("div");
      const lines = document.createElement("hr");
      questionContainer.classList.add("question-container");
      questionContent.setAttribute(
        "id",
        `question-number-${quizz.indexOf(quiz) + 1}`
      );
      answersContent.classList.add("answers-container");

      questionContent.textContent = decode(quiz.question) + "\n";
      // console.log(quiz.correct_answer);
      // work with

      const allAnswers = [...quiz.incorrect_answers];
      allAnswers.push(quiz.correct_answer);
      shuffle(allAnswers);

      allAnswers.forEach((answer) => {
        const answerDiv = document.createElement("div");
        const answerInput = document.createElement("input");
        const decodedAnswer = decode(answer);

        answerInput.setAttribute("type", "radio");
        answerInput.setAttribute("class", "radio-btn");
        answerInput.setAttribute("name", `question-no-${quizz.indexOf(quiz)}`);
        answerInput.setAttribute("value", `${decodedAnswer}`);
        answerInput.setAttribute(
          "id",
          `question-${quizz.indexOf(quiz)}--answer-${allAnswers.indexOf(
            answer
          )}`
        );

        answerInput.addEventListener("change", (event) => {
          handleSelectAnswer(event, quiz.correct_answer);
        });

        const answerLabel = document.createElement("label");
        answerLabel.setAttribute(
          "for",
          `question-${quizz.indexOf(quiz)}--answer-${allAnswers.indexOf(
            answer
          )}`
        );
        answerLabel.textContent = decodedAnswer;
        answerDiv.append(answerInput, answerLabel);
        answersContent.append(answerDiv);
      });

      //

      //

      questionContainer.append(questionContent, answersContent);
      quizzBlock.append(questionContainer, lines);
    });

    // add submitButton
    const submitButton = document.createElement("button");
    const resultLine = document.createElement("div");
    submitButton.onclick = () => {
      handleResult(quizz);
    };
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("submit-button", "btn", "btn-primary");
    // submitButton.addEventListener("click", handleSubmit);
    submitButton.innerHTML = "Check answers";
    quizzBlock.append(resultLine, submitButton);

    //handle result

    function handleResult(questionsData) {
      var answerContainers = quizzBlock.querySelectorAll(".answers-container");

      var userAnswer = "";
      for (var i = 0; i < questionsData.length; i++) {
        userAnswer = answerContainers[i].querySelector(
          "input[name=question-no-" + i + "]:checked" || {}
        ).value;
        // console.log(userAnswer);
        // console.log(questionsData[i].correct_answer);
        if (userAnswer === questionsData[i].correct_answer) {
          //     // add to the number of correct answers
          score++;
        }
        //   // if answer is wrong or blank
        else {
        }
      }
      resultLine.innerHTML = `you have ${score} correct answers`;
    }
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
  function handleSelectAnswer(event, correct_answer) {
    if (event.target.checked) {
      // console.log("hehe");
    }
  }
  // function handleSelectAnswer(event, correct_answer) {

  // }
  // handle submit button
  // function handleSubmit() {
  //   console.log(this);
  // }

  getQuestions(handleQuizzDisplay);
  return <div className="test"></div>;
}

export default TestPage;
