const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemaining = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = ["m", "a" ,"g", "n" ,"o", "l", "i" ,"a"];
const guessedLetters = [];

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
    message.innerText = "";
    const yourGuess = validateInput(guess);
    console.log(yourGuess);
    makeGuess(yourGuess);
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {
    message.innerText = "I don't see anything! You need to type in a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please type in one letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "What's that? Type in a letter between A and Z.";
  } else {
    return input;
  }
  };
  
  const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText =
        "Wait a minute! You already guessed that letter, so try again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
    }
  };
  

