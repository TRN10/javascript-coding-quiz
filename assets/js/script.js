// All questions, possible choices and correct answers

var questions = [
    {
        title: 'Commonly used data types DO NOT include ?',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    },

    {
        title: 'The condition in an if/else statement is enclosed within _______?',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
    },

    {
        title: 'Arrays in JavaScript can be used to store _______?',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },

    {
        title: 'String values must be enclosed within  ________ when being assigned to variables?',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    },

    {
        title: 'A very useful tool used during development and debugging for printing content to the user is?',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log()'],
        answer: 'console.log()',
    },
];


// Variable to track state of quiz

var currentQuestionIndex = 0;
var time = parseInt(questions.length * 15);
var timerId;

// variables that reference elements from DOM

var questionsEl = document.getElementById('questions');
var optionsEl = document.getElementById('choices');
var timerEl = document.getElementById('time');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

// start quiz function

function startQuiz() {

    var startScreen = document.getElementById('start-screen');
    startScreen.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);
    console.log(time);
    console.log(clockTick);
    timerEl.textContent = time;

    getQuestion();
}


function getQuestion() {

    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById('quiz-question');
    titleEl.textContent = currentQuestion.title;

    // clear the previous question choices
    optionsEl.innerHTML = '';

    // loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        console.log(currentQuestion);
        console.log(currentQuestion.choices);

        // create a button for each choice
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        // display on page
        optionsEl.appendChild(choiceNode);

    }
}

function questionClick(event) {
    var buttonEl = event.target;

    // if the clicked element is not a choice button return and do nothing
    if (!buttonEl.matches('.choice')) {
        return;
    }

    // check if the user guessed wrong
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        // subract time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // display the new time on page
        timerEl.textContent = time;


        feedbackEl.textContent = 'wrong!';

    } else {

        feedbackEl.textContent = 'correct!';
    }

    // display correct/incorrect feedback on page for half sec
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    // next question
    currentQuestionIndex++;

    // check if any questions left
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // show the final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // hide the questions section
    questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
    // update the timer
    time--;
    timerEl.textContent = time;

    // check if user runs out of time
    if (time <= 0) {
        quizEnd();
    }
}

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element with choices
optionsEl.onclick = questionClick;


function saveHighScore() {

    // obtain value of input box
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        // get saved scores from local storage, or set to empty array if none saved
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        // format new score for current user
        var newScore = {
            score: time,
            initials: initials,
        };

        // save to local storage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        highscores.textContent = newScore;

        // redirect to next page
        window.location.href = 'highscores.html';
        listHighScores();
    }
}

function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveHighScore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighScore;

initialsEl.onkeyup = checkForEnter;





// function to render high scores

function listHighScores() {

    var highScoresEl = document.getElementById('highscores');


    for (var i = 0; i < highScoresEl.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = highScoresEl[i].initials + " " + highScoresEl[i].score;
        highscores.appendChild(createLi);

    }
}
