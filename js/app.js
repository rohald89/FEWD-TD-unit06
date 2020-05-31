const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let missed = 0;
const header = document.querySelector("#overlay .title");
const phraseUl = document.querySelector("#phrase ul");
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
      const ol = document.querySelector("#scoreboard ol");
      const li = ol.firstElementChild;
      li.remove();
      const lis = document.createElement("li");
      const lostHeart = document.createElement("img");
      lostHeart.src = "images/lostHeart.png";
      lostHeart.className = "lostHeart";
      lis.append(lostHeart);
      ol.append(lis);
      missed += 1;
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
    const h3 = document.createElement("h3");
    h3.innerHTML = `The correct phrase was:   
    <span> ${phraseAsArray.join("")}</span>.`;
    overlay.appendChild(h3);
  }
}

//  =======================
//  ======= EXCEEDS =======
//  =======================

// Add a button to the “success” and “failure” screens that reset the game. You’ll have to recreate the buttons in the keyboard, generate a new random phrase, and set the number of misses to zero.

startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  const newPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhrase);
});
