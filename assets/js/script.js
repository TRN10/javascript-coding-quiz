// Variable to track state of quiz

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables that reference elements from DOM

var questionsEl = document.getElementById('questions');
var optionsEl = document.getElementById('options');
var timerEl = document.getElementById('time');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var nameEl = document.getElementById('name');
var feedbackEl = document.getElementById('feedback');

// start quiz function

function startQuiz() {

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {

    var currentQuestion = questions[currentQuestionsIndex];

    //update title with current question
    var titleEl = document.getElementById('quiz-question');
    titleEl.textContent = currentQuestion.title;

    //clear previous question choices
    optionsEl.innerHTML = '';

    //loop over choices
    for (var i = 0; i < currentQuestion.options.length; i++) {
        console.log(currentQuestion);
        console.log(currentQuestion.options);

        //create button for each choice
        var choice = currentQuestion.options[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        //display on page
        optionsEl.appendChild(choiceNode);

    }
}

function questionClick(event) {
    var buttonEl = event.target;

    //if clicked element is not a choice button do nothing
    if (!buttonEl.matches('.choice')) {
        return;
    }

    //check if user guessed wrong
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        //penalize time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        //display new time on page
        timerEl.textContent = time;


        feedbackEl.textContent = 'wrong!';

    } else {

        feedbackEl.textContent = 'correct!';
    }

    //display correct/incorrect feedback on page for half sec
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    //next question
    currentQuestionIndex++;

    // check if any questions left
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}