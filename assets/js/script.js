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