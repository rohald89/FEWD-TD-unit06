const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let missed = 0;
const header = document.querySelector("#overlay .title");
const phraseUl = document.querySelector("#phrase ul");
const livesLi = document.querySelectorAll("#scoreboard ol li");
const triesImg = document.querySelectorAll(".tries img");
// startGame.addEventListener("click", () => {
//   overlay.style.visibility = "hidden";
// });

const phrases = [
  "it is not a bug it is an undocumented feature",
  "deleted code is debugged code",
  "do not comment bad code rewrite it",
  "java is to javascript what car is to carpet",
  "first solve the problem then write the code",
];

function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const phraseAsArray = Array.from(randomPhrase);
  return phraseAsArray;
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let letter = document.createElement("li");
    letter.textContent = arr[i];
    phraseUl.appendChild(letter);
    if (arr[i] != " ") {
      letter.className = "letter";
    } else {
      letter.className = "space";
    }
  }
}

function checkLetter(clickedLetter) {
  const letters = document.querySelectorAll(".letter");
  let matchingLetter = null;
  for (i = 0; i < letters.length; i++) {
    if (clickedLetter == letters[i].textContent) {
      letters[i].className = "letter show";
      matchingLetter = letters[i].textContent;
    }
  }
  return matchingLetter;
}

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clickedButton = e.target;
    clickedButton.className = "chosen";
    clickedButton.disabled = "true";
    const letterFound = checkLetter(clickedButton.textContent);
    if (letterFound === null) {
      const triesLi = document.querySelectorAll(".tries");
      const loseHeart = document.querySelectorAll(".tries img");
      missed += 1;
      loseHeart[0].src = "images/lostHeart.png";
      triesLi[0].className = "";
    }
    checkWin();
  }
});

function checkWin() {
  const numberOfVisibleLetters = document.getElementsByClassName("show");
  const numberOfLetters = document.getElementsByClassName("letter");

  if (numberOfLetters.length == numberOfVisibleLetters.length) {
    overlay.className = "win";
    header.textContent = "You Win!";
    overlay.style.visibility = "visible";
    startGame.textContent = "Play Again";
  } else if (missed >= 5) {
    overlay.className = "lose";
    header.textContent = "You Lost!";
    overlay.style.visibility = "visible";
    startGame.textContent = "Try again";
  }
}

//  =======================
//  ======= EXCEEDS =======
//  =======================

function resetGame() {
  missed = 0;
  const keyboard = document.querySelectorAll("button");
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].className = "";
    keyboard[i].disabled = false;
  }
  phraseUl.textContent = "";
  for (let i = 0; i < livesLi.length; i++) {
    livesLi[i].className = "tries";
    triesImg[i].src = "images/liveHeart.png";
  }
}

startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  resetGame();
  const newPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhrase);
});
