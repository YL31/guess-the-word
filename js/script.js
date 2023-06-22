const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
// const spanRemaining = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch(
      "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await request.text();
    const wordArray = words.split("\n");
    selectRandomWord(wordArray);
    placeholder(word);
  };
  
  const selectRandomWord = function (wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    word = randomWord.trim(placeholder);
  };

const placeholder = function (word) {
  const wordArray = [];
  const circleHolder = "●";
  for (const letter of word) {
    console.log(letter);
    wordArray.push(circleHolder);
  }
  wordInProgress.innerText = wordArray.join("");
};

getWord();

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
    countRemainingGuesses(guess);
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
    } else {
      updatedCharacters.push("●");
    }
  }
  wordInProgress.innerText = updatedCharacters.join("");
  checkGuessedWord();
};

const countRemainingGuesses = function (guess) {
    word.toUpperCase();
    if (word.toUpperCase().includes(guess)) {
      message.innerText = `Hooray! The letter ${guess} is in the word. You're almost there!`;
    } else {
      message.innerText = `Nope. ${guess} isn't in this word.`;
      remainingGuesses -= 1;
    }
  
    if (remainingGuesses === 0) {
      message.innerText = `Sorry, no more guesses left. The word is ${word.toUpperCase()}.`;
    } else if (remainingGuesses === 1) {
      remainingGuessesElement.innerHTML =
        '<p class="remaining">You have <span>1 guess</span> remaining.</p>';
    } else if (remainingGuesses > 1) {
      remainingGuessesElement.innerHTML = `<p class="remaining">You have <span>${remainingGuesses} guesses</span> remaining.</p>`;
    }
  };

const checkGuessedWord = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML =
      '<p class= "highlight">You guessed the word! Congrats!</p>';
  }
  startOver();
};

const startOver = function () {
    if (
      wordInProgress.innerText === word.toUpperCase() ||
      remainingGuesses === 0
    ) {
      guessedLettersElement.classList.add("hide");
      guessButton.classList.add("hide");
      remainingGuessesElement.classList.add("hide");
      playAgainButton.classList.remove("hide");
    }
  };
  
  playAgainButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.classList.remove("win");
    message.innerText = "";
    remainingGuesses = "8";
    guessedLetters = [];
    guessButton.classList.remove("hide");
    guessedLettersElement.innerHTML = "";
    guessedLettersElement.classList.remove("hide");
    remainingGuessesElement.innerHTML = `<p class="remaining">You have <span>${remainingGuesses} guesses</span> remaining.</p>`;
    remainingGuessesElement.classList.remove("hide");
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
  });
  
  
