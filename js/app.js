const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let missed = 0;

startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
});

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

const phraseAsArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let letter = document.createElement("li");
    letter.textContent = arr[i];
    document.querySelector("#phrase ul").appendChild(letter);
    if (arr[i] != " ") {
      letter.className = "letter";
    } else {
      letter.className = "space";
    }
  }
}
console.log(phraseAsArray);
addPhraseToDisplay(phraseAsArray);

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
  console.log(numberOfVisibleLetters);
  console.log(numberOfLetters);
  if (numberOfLetters.length == numberOfVisibleLetters.length) {
    overlay.className = "win";
    overlay.style.visibility = "visible";
  } else if (missed >= 5) {
    overlay.className = "lose";
    overlay.style.visibility = "visible";
  }
}

// Create a checkWin function.
// Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.

//  =======================
//  ======= EXCEEDS =======
//  =======================

// Create CSS transitions for each letter in the phrase display as they are revealed.

// Add a button to the “success” and “failure” screens that reset the game. You’ll have to recreate the buttons in the keyboard, generate a new random phrase, and set the number of misses to zero.
