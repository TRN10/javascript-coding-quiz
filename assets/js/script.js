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
var nameEl = document.getElementById('name');
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

// function clockTick() {
//     time--;
//     timerEl.textContent = time;
//     if (time <= 0) {
//         quizEnd();
//     }
// }

function getQuestion() {

    var currentQuestion = questions[currentQuestionIndex];

    //update title with current question
    var titleEl = document.getElementById('quiz-question');
    titleEl.textContent = currentQuestion.title;

    //clear previous question choices
    optionsEl.innerHTML = '';

    //loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        console.log(currentQuestion);
        console.log(currentQuestion.choices);

        //create button for each choice
        var choice = currentQuestion.choices[i];
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

function quizEnd() {
    //stop timer
    clearInterval(timerId);

    //show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    //show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    //hide questions section
    questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
    //update time
    time--;
    timerEl.textContent = time;

    //check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

// user clicks button to start quiz
startBtn.onclick = startQuiz;

//user clicks on  element with choices
optionsEl.onclick = questionClick;