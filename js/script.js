const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
// const remainingGuesses = document.querySelector(".remaining");
// const spanRemaining = document.querySelector("span");
const message = document.querySelector(".message");
// const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const wordArray = [];
  const circleHolder = "●";
  for (const letter of word) {
    console.log(letter);
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
    displayLetter();
    updateWordProgress(guessedLetters);
  }
};

const displayLetter = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    let li = document.createElement("li");
    li.innerHTML = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const updatedCharacters = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedCharacters.push(letter.toUpperCase());
      wordInProgress.innerText = updatedCharacters.join("");
    } else {
      updatedCharacters.push("●");
    }
  }
  checkGuessedWord();
};

const checkGuessedWord = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML =
      '<p class= "highlight">You guessed the word! Congrats!</p>';
  }
};
