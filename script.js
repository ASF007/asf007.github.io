"use strict";

// edit this if u want to end game quicker
const WIN_SCORE = 100;
// Elements
const diceImgEl = document.querySelector(".dice");

const score0Elem = document.querySelector("#score--0"); // plr 1 score
const score1Elem = document.getElementById("score--1"); // plr 2

const currentScore0Elem = document.getElementById("current--0"); // plr 1
const currentScore1Elem = document.getElementById("current--1"); // plr 2

//buttons
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");
// init values
score0Elem.textContent = 0;
score1Elem.textContent = 0;
document.querySelector(".rule span").textContent = WIN_SCORE;

diceImgEl.classList.add("hidden");

// data related stuff
let gameEnded = false;
// Index 0 = player 1, and 1 = player 2
let currentPlayer = 0; // player 1 we start with
let scoresData = [
  {
    score: 0,
    currentScore: 0,
    scoreElement: score0Elem,
    currentScoreElement: currentScore0Elem,
  },
  {
    score: 0,
    currentScore: 0,
    scoreElement: score1Elem,
    currentScoreElement: currentScore1Elem,
  },
];

// utility functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rollDice = () => {
  const diceVal = randInt(1, 6);
  diceImgEl.src = `dice-${diceVal}.png`;
  return diceVal;
};

const toggleActivePlayer = () => {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove("player--active");
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add("player--active");
};

const declareWinner = () => {
  const playerElement = document.querySelector(`.player--${currentPlayer}`);
  playerElement.classList.add("player--winner");
};

const resetGame = () => {
  for (const data of scoresData) {
    data.score = 0;
    data.currentScore = 0;
    data.scoreElement.textContent = 0;
    data.currentScoreElement.textContent = 0;
  }
  gameEnded = false;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove("player--winner", "player--active");

  currentPlayer = 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add("player--active");

  diceImgEl.classList.add("hidden");
};
const updateScore = (value, reset = false) => {
  const data = scoresData[currentPlayer];
  data.score = reset ? 0 : data.score + value;
  data.scoreElement.textContent = data.score;
  return data.score;
};

const updateCurrentScore = (value, reset = false) => {
  const data = scoresData[currentPlayer];
  data.currentScore = reset ? 0 : data.currentScore + value;
  data.currentScoreElement.textContent = data.currentScore;
  return data.currentScore;
};

// roll dice logic
rollDiceBtn.addEventListener("click", () => {
  if (gameEnded) return;

  if (diceImgEl.classList.contains("hidden"))
    diceImgEl.classList.remove("hidden");
  const diceVal = rollDice();

  if (diceVal === 1) {
    updateCurrentScore(0, true);
    toggleActivePlayer();
  } else {
    updateCurrentScore(diceVal);
  }
});

// hold button
holdScoreBtn.addEventListener("click", () => {
  if (gameEnded) return;
  const data = scoresData[currentPlayer];
  if (updateScore(data.currentScore) >= WIN_SCORE) {
    gameEnded = true;
    declareWinner();
  } else {
    updateCurrentScore(0, true);
    toggleActivePlayer();
  }
});

newGameBtn.addEventListener("click", resetGame);
