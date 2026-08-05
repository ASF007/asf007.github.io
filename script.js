"use strict";

// Elements
const diceImgEl = document.querySelector(".dice");
const players = document.querySelectorAll(".player");

const score1Elem = document.querySelector("#score--0"); // plr 1 score
const score2Elem = document.getElementById("score--1"); // plr 2

//buttons
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");
// init values
score1Elem.textContent = 0;
score2Elem.textContent = 0;

diceImgEl.classList.toggle("hidden");

let gameEnded = false;

// utility functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rollDice = () => {
  const diceVal = randInt(1, 6);
  diceImgEl.src = `assets/dice-${diceVal}.png`;
  return diceVal;
};

const toggleActivePlayer = () => {
  players.forEach((plr, index) => {
    plr.classList.toggle("player--active");
  });
};
const getCurrentPlayer = () => {
  for (const player of players) {
    if (player.classList.contains("player--active")) return player;
  }
};
const updateScore = (plr, value, reset = false) => {
  const scoreElem = plr.classList.contains("player--0")
    ? score1Elem
    : score2Elem;

  if (reset) {
    scoreElem.textContent = 0;
    return 0;
  }
  const currentValue = Number(scoreElem.textContent);
  const newScore = currentValue + value;
  scoreElem.textContent = newScore;
  return newScore;
};

const updateCurrentScore = (plr, value, reset = false) => {
  const currentScoreElem = plr.classList.contains("player--0")
    ? currentScore1
    : currentScore2;

  if (reset) {
    currentScoreElem.textContent = 0;
    return 0;
  }

  const currentValue = Number(currentScoreElem.textContent);
  const newScore = currentValue + value;
  currentScoreElem.textContent = newScore;
  return newScore;
};
// roll dice logic

let currentScore1 = document.getElementById("current--0");
let currentScore2 = document.getElementById("current--1");
rollDiceBtn.addEventListener("click", () => {
  if (gameEnded) return;
  const diceVal = rollDice();

  if (diceImgEl.classList.contains("hidden"))
    diceImgEl.classList.toggle("hidden");

  const player = getCurrentPlayer();
  let currentScore = player.classList.contains("player--0")
    ? currentScore1
    : currentScore2;

  if (diceVal === 1) {
    toggleActivePlayer();
    currentScore.textContent = 0;
  } else {
    console.log(currentScore);
    updateCurrentScore(player, diceVal);
  }
});

// hold button
holdScoreBtn.addEventListener("click", () => {
  if (gameEnded) return;
  const player = getCurrentPlayer();
  let currentScore = player.classList.contains("player--0")
    ? currentScore1
    : currentScore2;
  const updatedScore = updateScore(player, Number(currentScore.textContent));
  if (updatedScore < 100) toggleActivePlayer();
  else {
    player.classList.add("player--winner");
    gameEnded = true;
  }
  currentScore.textContent = 0;
});

newGameBtn.addEventListener("click", () => {
  if (gameEnded) gameEnded = false;
  for (const player of players) {
    player.classList.remove("player--active");
    player.classList.remove("player--winner");
    updateScore(player, 0, true);
    updateCurrentScore(player, 0, true);
  }
  players[0].classList.add("player--active");
  if (diceImgEl.classList.contains("hidden") === false) {
    diceImgEl.classList.toggle("hidden");
  }
});
