let questionNumber = 0;
let score = 0;

function createQuestion() {
  console.log("createQuestion ran");
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
        <div class="question-number-display"><h2>Question #${questionNumber + 1}</h2></div>
        <p>${STORE[questionNumber].question}</p>
        <form>
          <fieldset>
            <label>
              <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required="">
              <span class="questionAnswer">${STORE[questionNumber].answers[0]}</span>
            </label>
            <label>
              <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required="">
              <span class="questionAnswer">${STORE[questionNumber].answers[1]}</span>
            </label>
            <label>
              <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required="">
              <span class="questionAnswer">${STORE[questionNumber].answers[2]}</span>
            </label>
            <label>
              <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required="">
              <span class="questionAnswer">${STORE[questionNumber].answers[3]}</span>
            </label>
          </fieldset>
            <button type="submit" class="submitButton">Submit</button>
        </form>
      </div>`
  }
  else {
    showResults();
    restartQuiz();
  }
}

function renderQuestion() {
    $('.questionForm').html(createQuestion());
    console.log("renderQuestion ran");    
}

function submitAnswer() {
    $('form').on('submit', function (event) {
      console.log("submitAnswer ran");
      event.preventDefault();
      let selected = $('input:checked');
      let userAnswer = selected.val();
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (userAnswer === correctAnswer) {
        answerFeedbackCorrect();
      }
      else {
        answerFeedbackIncorrect();
      }
    }
    );
    console.log("submitAnswer ran");
}

function answerFeedbackCorrect() {
    console.log("answerFeedbackCorrect ran"); 
    console.log(questionNumber);
    if (questionNumber === 9) {
      $('.questionForm').html(`<div><h2 class="response-title">Correct!</h2><p>${STORE[questionNumber].extraInfo}</p></div><button type="submit" class="finishButton">Finish</button>`);
    }
    else {
      $('.questionForm').html(`<div><h2 class="response-title">Correct!</h2><p>${STORE[questionNumber].extraInfo}</p></div><button type="submit" class="nextButton">Next</button>`);
    }
    updateScore ();
}

function answerFeedbackIncorrect() {
    console.log("answerFeedbackIncorrect ran");
    if (questionNumber === 9) {
      $('.questionForm').html(`<div><h2>Incorrect.</h2><p>${STORE[questionNumber].extraInfo}</p></div><button type="submit" class="finishButton">Finish</button>`);
    }
    else {
      $('.questionForm').html(`<div><h2>Incorrect.</h2><p>${STORE[questionNumber].extraInfo}</p></div><button type="submit" class="nextButton">Next</button>`);
    } 
}

function updateScore() {
  score++;
  $('.score').text(score);
  console.log("updateScore ran");
}

function nextQuestion() {
  $('.questionForm').on('click', '.nextButton', function (event) {
    console.log("nextQuestion ran");
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
    renderQuestion ();
    submitAnswer ();
  })
  
}

function lastQuestion() {
  $('.questionForm').on('click', '.finishButton', function (event) {
    console.log("lastQuestion ran");
    questionNumber++;
    renderQuestion ();
    submitAnswer ();
  })
  
}

function showResults() {

  if (score === 10) {
    $('.questionForm').html(`<div class="resultsPerfect"><h1 class="results-title">Perfection!</h1><h2>You scored ${score}/10</h2><p>"There are no shortcuts in the quest for perfection." - Hogan</p><button class="restartButton">Restart</button></div>`);
    console.log("showResults ran");
  }
  else if (score > 6) {
    $('.questionForm').html(`<div class="resultsOkay"><h1 class="results-title">Not bad.</h1><h2>You scored ${score}/10</h2><p>"Golf is not a game of good shots. It's a game of bad shots." - Hogan</p><button class="restartButton">Restart</button></div>`);
    console.log("showResults ran");
  }
  else {
    $('.questionForm').html(`<div class="resultsBad"><h1 class="results-title">Ouch.</h1><h2>You scored ${score}/10</h2><p>"Shoot a lower score than everybody else." - Hogan</p><p>Wait, that might not apply here...</p><button class="restartButton">Restart</button></div>`);
    console.log("showResults ran");
  }
}

function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}
function startQuiz() {
    $('.quizStart').on('click', '.startButton', function (event) {
      console.log("startQuiz ran");
      $('.quizStart').remove();
      $('.questionForm').css('display', 'block');
      $('.scoreBanner').css('display', 'block');
      $('.questionNumber').text(1);
    renderQuestion();
    submitAnswer();
    nextQuestion();
    lastQuestion();
  });
  }

$(startQuiz);