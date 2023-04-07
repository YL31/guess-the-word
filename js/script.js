const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemaining = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = ["m", "a" ,"g", "n" ,"o", "l", "i" ,"a"];

const placeholder = function (word) {
  const wordArray = [];
  const circleHolder = "●";
  for (const letter of word) {
    wordArray.push(circleHolder);
  }
  wordInProgress.innerText = wordArray.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessInput = input.value;
    console.log(guessInput);
    input.value = "";
  });
  



