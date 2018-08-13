window.addEventListener('load', init)
// Globals

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
let currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const levelSelect = document.querySelector('#levels');

// Fill this array of words
const words = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten'
];

// Initialise Game
function init() {
  // Manage level changes
  levelSelect.addEventListener('click', setLevel)
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Change the level based on the button they clicked
function setLevel(e) {

  var selectedLevel = e.target.value;
  // Set currentlevel to selectedLevel
  if (selectedLevel === "easy") {
    currentLevel = levels.easy;
  } else if (selectedLevel === "medium") {
    currentLevel = levels.medium;
  } else if (selectedLevel === "hard") {
    currentLevel = levels.hard;
  }

  // Last selected button color change
  var buttons = document.getElementsByTagName('button');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('btn-info')
    buttons[i].classList.add('btn-secondary')

    e.target.classList.remove('btn-secondary')
    e.target.classList.add('btn-info')
  }

  // Reset game on level change
  isPlaying = false;
  time = 0;
  wordInput.value = "";
}

// Start match
function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  // if score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    // Makes message color green on success
    message.classList.remove('text-danger');
    message.classList.add('text-success');
    return true
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick and show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length)
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

function countdown() {
  // Make sure time is not run out
  if(time > 0) {
    time--;
  } else if (time === 0) {
    // Game over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0 /* && wordInput.value === "" */) {
    message.innerHTML = 'Game Over!!!';
    // Make message colour red on game over
    message.classList.remove('text-success');
    message.classList.add('text-danger');
    // Set score to -1 so user doesnt get a free point when starting a new game.
    score = -1;
  }
}
