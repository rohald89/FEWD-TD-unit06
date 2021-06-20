const qwerty = document.getElementById("qwerty");
const startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const header = document.querySelector("#overlay .title");
const phraseUl = document.querySelector("#phrase ul");
const livesLi = document.querySelectorAll("#scoreboard ol li");
const triesImg = document.querySelectorAll(".tries img");
let missed = 0;

const phrases = [
  "it is not a bug it is an undocumented feature",
  "deleted code is debugged code",
  "do not comment bad code rewrite it",
  "java is to javascript what car is to carpet",
  "first solve the problem then write the code",
];

const getRandomPhraseAsArray = arr => {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return Array.from(randomPhrase);
}

const addPhraseToDisplay = arr => {
  arr.forEach(letter => {
    const li = document.createElement('li');
    li.textContent = letter;
    phraseUl.appendChild(li);
    letter !== " " ? li.className = "letter" : li.className = "space";
  });
}

const checkLetter = clickedLetter => {
  let matchingLetter = null;
  document.querySelectorAll(".letter").forEach(letter => {
    if(clickedLetter === letter.textContent) {
      letter.classList.add('show');
      matchingLetter = letter.textContent;
    }
  });
  return matchingLetter;
}

const checkWin = () => {
  const numberOfVisibleLetters = document.getElementsByClassName("show").length;
  const numberOfLetters = document.getElementsByClassName("letter").length;

  if (numberOfLetters == numberOfVisibleLetters) {
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

const resetGame = () => {
  missed = 0;

  document.querySelectorAll("button").forEach(key => {
    key.className = '';
    key.disabled = false;
  });

  phraseUl.textContent = "";

  livesLi.forEach((life, i) => {
    life.className = 'tries';
    triesImg[i].src = 'images/liveHeart.png';
  });

  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}

startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  resetGame();
});

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clickedButton = e.target;
    clickedButton.className = "chosen";
    clickedButton.disabled = "true";
    const letterFound = checkLetter(clickedButton.textContent);
    if (letterFound === null) {
      triesImg[missed].src = "images/lostHeart.png";
      missed += 1;
    }
    checkWin();
  }
});
