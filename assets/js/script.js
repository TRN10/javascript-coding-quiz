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
        console.log(currentQuestion.options)

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