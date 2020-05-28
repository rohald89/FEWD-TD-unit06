const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let missed = 0;

// attach an event listener to the "start game" button to hide the start screen overlay
startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
});

// create a phrases array that contains at least 5 different phrases as strings
// make sure that the phrases only contain letters and spaces so no need to guess for punctuation of special characters.
const phrases = [
  "it is not a bug it is an undocumented feature",
  "deleted code is debugged code",
  "do not comment bad code rewrite it",
  "java is to javascript what car is to carpet",
  "first solve the problem then write the code",
];

// create a getRandomPhraseAsArray function
// this function should randomly choose a phrase from the phrases array and split that phrase into a new array of characters. The function should then return the new character array
// Keep in mind that you’ll need to write this function so that it is reusable-- meaning that it can take any given array of strings (with no special characters) and return an array of characters. To do that, you’ll write the function so that it takes an array as a parameter:

// function getRandomPhraseAsArray(arr){
//do stuff to any arr that is passed in
//}

// and to use the function, you’ll pass in the phrases array as an argument when you call the function:
//getRandomPhraseAsArray(phrases);
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const phraseAsArray = Array.from(randomPhrase);
  return phraseAsArray;
}

// Set the game display.
// Create an addPhraseToDisplay function that loops through an array of characters. Inside the loop, for each character in the array, you’ll create a list item, put the character inside of the list item, and append that list item to the #phrase ul in your HTML. If the character in the array is a letter and not a space, the function should add the class “letter” to the list item.

//You’ll need to write the addPhraseToDisplay function so that it can take any array of letters and add it to the display. To do that, the function will need to take an array as a parameter:
// function addPhraseToDisplay(arr){
//     // do stuff any arr that is passed in, and add to `#phrase ul`
// }

// To use the function, you’ll get the value returned by the getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:
// const phraseArray = getRandomPhraseAsArray(phrases);
//addPhrasetoDisplay(phraseArray);
const phraseAsArray = getRandomPhraseAsArray(phrases);
console.log(phraseAsArray);

function addPhraseToDisplay(arr) {
  // do stuff any arr that is passed in, and add to `#phrase ul`
  for (let i = 0; i < arr.length; i++) {
    // create li
    //put i inside the li
    // append li to #phrase ul
    let letter = document.createElement("li");
    letter.textContent = arr[i];
    document.querySelector("#phrase ul").appendChild(letter);
    if (arr[i] != " ") {
      letter.className = "letter";
    }
  }
}

addPhraseToDisplay(phraseAsArray);

// Create a checkLetter function.
// The checkLetter function will be used inside of the event listener you’ll write in the next step.

// This function should have one parameter: the button the player has clicked when guessing a letter.

// The checkLetter function should get all of the elements with a class of “letter” (remember that we added the letter class to all of the letters and none of the spaces when we made the game display). The function should loop over the letters and check if they match the letter in the button the player has chosen.

// If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.

// If a match wasn’t found, the function should return null.

// Add an event listener to the keyboard.
// Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks. See the MDN documentation for more details.
// Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.

// Count the missed guesses in the game.
// If the checkLetter function returns a null value, the player has guessed the wrong letter. In the keyboard event listener, after checkLetter is called, write a statement to check the value of the letterFound variable. If the value is null, remove one of the tries from the scoreboard. If you haven't created it yet, make sure you have a missed variable to store the state of the scoreboard (initialized to 0). When you remove a try from the scoreboard, make sure to increase the missed count by 1.

// Create a checkWin function.
// Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.

//  =======================
//  ======= EXCEEDS =======
//  =======================

// Create CSS transitions for each letter in the phrase display as they are revealed.

// Add a button to the “success” and “failure” screens that reset the game. You’ll have to recreate the buttons in the keyboard, generate a new random phrase, and set the number of misses to zero.
