function TestPage() {
  const triviaAPI = "https://opentdb.com/api.php?amount=5";
  let score = 0;
  // get data from api
  function getQuestions(callback) {
    fetch(triviaAPI)
      .then((data) => data.json())
      .then(callback);
  }
  // display quizz
  function handleQuizzDisplay(data) {
    console.log(data);
    const quizzBlock = document.querySelector(".test");
    const quizz = data.results;
    //create html elements for questions
    quizz.forEach((quiz) => {
      const questionContainer = document.createElement("div");
      const questionContent = document.createElement("p");
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

      const allAnswers = [...quiz.incorrect_answers];
      allAnswers.push(quiz.correct_answer);
      shuffle(allAnswers);
      //create html elements for answers of each question
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

    // create submit button
    const submitButton = document.createElement("button");
    const resultLine = document.createElement("div");
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("submit-button", "btn", "btn-primary");
    submitButton.innerHTML = "Check answers";
    quizzBlock.append(resultLine, submitButton);
    submitButton.onclick = () => {
      handleResult(quizz);
    };
    // create restart button
    const restartButton = document.createElement("button");
    restartButton.classList.add("restart-button", "btn", "btn-success");
    restartButton.innerHTML = "restart";
    restartButton.onclick = () => {
      handleRestart();
    };
    // handle hide buttons
    function hideButton() {
      submitButton.classList.add("hide-button");
      quizzBlock.append(restartButton);
    }

    //handle result

    function handleResult(questionsData) {
      var answerContainers = quizzBlock.querySelectorAll(".answers-container");
      // console.log(answerContainers);
      var userAnswer = "";
      var userAnswerID = "";

      for (var i = 0; i < questionsData.length; i++) {
        const answerLocation = answerContainers[i].querySelector(
          "input[name=question-no-" + i + "]:checked"
        );
        if (answerLocation === null) {
          alert("please answer all 5 questions");
          return hideButton();
        } else {
          userAnswer = answerLocation.value;
          userAnswerID = answerContainers[i].querySelector(
            "input[name=question-no-" + i + "]:checked"
          ).id;

          if (userAnswer === questionsData[i].correct_answer) {
            // add to the number of correct answers
            score++;

            document
              .querySelector("label[for=" + userAnswerID + "]")
              .classList.add("correct-selection");
          }
          // check if answer is wrong or blank
          else {
            document
              .querySelector("label[for=" + userAnswerID + "]")
              .classList.add("wrong-selection");
          }
        }
      }
      resultLine.innerHTML = `you have ${score} correct answers`;
      hideButton();
    }
  }

  // handle decode special characters
  function decode(str) {
    let txt = document.createElement("textarea");

    txt.innerHTML = str;

    return txt.value;
  }
  //handle restart
  function handleRestart() {
    window.location = "http://localhost:3000";
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

  getQuestions(handleQuizzDisplay);
  return <div className="test"></div>;
}

export default TestPage;
