// Global variables

let startGameBtn = document.querySelector("#start-game-btn");
let boxes = document.querySelectorAll(".box");
let mainColorBlock = document.querySelector(".game-board__main-color");
let scoreAmount = document.querySelector("#score-amount");
let timeLeftOutput = document.querySelector("#time-amount");

let mainColor;
let lastMainColor;

let score = 0;
let timeUp = false;

let boxNumber; // verte priskiriama kiekviename lygyje atskirai;

let player = document.querySelector("#name"); // zaidejo vardo input;

let level; // verte priskiriama kiekviename lygyje atskirai;

let playerList = JSON.parse(localStorage.getItem("playerList")) || [];

// Common Functions

// Kiekvienam box priskiriama spalva;
function setColor() {
  let randomNumbArr = [];

  while (randomNumbArr.length < boxNumber) {
    let randomNumb = Math.floor(Math.random() * colors.length);
    if (randomNumbArr.indexOf(randomNumb) === -1)
      randomNumbArr.push(randomNumb);
  }

  let i = 0;

  Array.from(boxes).forEach((box) => {
    box.style.backgroundColor = colors[randomNumbArr[i]];
    i++;
  });
}

function startGame() {
  setColor();
  startGameBtn.disabled = true;
  score = 0;
  timeUp = false;

  let index = Math.floor(Math.random() * colors.length);
  mainColor = colors[index];
  mainColorBlock.style.backgroundColor = mainColor;

  let timeLeft = time / 1000;

  setTimeout(() => {
    timeUp = true;
    startGameBtn.disabled = false;
  }, time);

  setInterval(() => {
    if (timeLeft > 0) {
      timeLeftOutput.innerText = `${--timeLeft} seconds`;
    }
  }, 1000);
}

// Vardo nustatymas;
function addPlayerName() {
  if (player) {
    return player.value;
  } else {
    return "Anonymous";
  }
}

function catchColor(e) {
  if (!timeUp) {
    let currentBoxStyle = getComputedStyle(e.target);
    let mainColorStyle = getComputedStyle(mainColorBlock);

    if (currentBoxStyle.backgroundColor === mainColorStyle.backgroundColor) {
      score++;
      scoreAmount.innerText = score;
      lastMainColor = mainColorStyle.backgroundColor;
      changeColor();
    }
  } else {
    // sukuriamas objektas, kuris bus issaugomas local storsge;
    let playerObj = {
      name: player.value || "Anonymous",
      gameLevel: level,
      finalScore: score,
    };
    // Objektas ikeliamas i masyva;
    playerList.push(playerObj);
    // Masyvas keliauja i local Storage
    return (
      playerList, localStorage.setItem("playerList", JSON.stringify(playerList))
    );
  }
}

function changeColor() {
  if (!timeUp) {
    let index = Math.floor(Math.random() * colors.length);
    let boxesColors = [];

    boxes.forEach((box) => {
      let style = getComputedStyle(box);
      boxesColors.push(style.backgroundColor);
    });

    mainColor = boxesColors[index];

    if (mainColor === lastMainColor) {
      changeColor();
    } else {
      mainColorBlock.style.backgroundColor = mainColor;
    }
  }
}

//Common Events
document.addEventListener("DOMContentLoaded", setColor);
startGameBtn.addEventListener("click", startGame);
boxes.forEach((box) => box.addEventListener("click", catchColor));
