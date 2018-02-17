




// The array holds the words to use for the game
var words = [
    ["h", "o", "r", "s", "e"], 
    ["p", "l", "a", "y", "g", "r", "o", "u", "n", "d"], 
    ["b", "a", "b", "i", "e", "s"], 
    ["p", "r", "o", "g", "r", "a", "m", "m", "e", "r"], 
    ["d", "e", "v", "e", "l", "o", "p", "e", "r"], 
    ["a", "u", "s", "t", "i", "n"]
  ];

//Global variables
var alreadyGuessed = document.getElementById("alreadyGuessed");
var guessesLeft = document.getElementById("guessesLeft");
var wrongLetters = document.getElementById("wrongLetters");
var randomWord = Math.floor((Math.random()*(words.length-1)));
var choosenWord = words[randomWord];
var workingWord = new Array(choosenWord.length);
var numberOfAttempts = 10;
var countersoFar = 0;
var correctLetters = "";
var correctSound = document.getElementById("correct");
var wrongSound = document.getElementById("wrong");


for( var i = 0; i < workingWord.length; i++ ){
workingWord[i] = "_";
};

function playCorrect(){
  correctSound.play();
}

function playWrong(){
  wrongSound.play();
}

//Resets variable values
function restart() {
console.clear();
var previousRandomWord = randomWord;

while (randomWord == previousRandomWord) {
randomWord = Math.floor((Math.random()*(words.length-1)));
console.log("Random Number was: " + randomWord + " previous one was: " + previousRandomWord);
}

choosenWord = words[randomWord];
console.log("Choosen word " + choosenWord);

workingWord = new Array(choosenWord.length);
numberOfAttempts = 10;
countersoFar = 0;
correctLetters = "";
wrongLetters.innerHTML = "";
letterChosen = "";
guessesLeft.innerHTML = "10";


for( var i = 0; i < workingWord.length; i++ ){
workingWord[i] = "_";
};

}


function printGuessedWordToWindow() {
var underScoreHtml = document.getElementById("guessedWord");
underScoreHtml.innerHTML = workingWord.join(" ");
}


function printGuessedSoFarToWindow(){
console.log("Guessed so far: " + correctLetters);
var underScoreHtml = document.getElementById("guessedSoFar");
}


function checkIfExists(x) {
//Check if letterChosen exists in choosenWord
var foundLetter = false;
for (i = 0; i < choosenWord.length ; i++) {
if (choosenWord[i] == x) {
  if (workingWord[i] == "_") {
      //Flip the letter if correct
      console.log("You got one!");
      flipCharacter(i, x);
      foundLetter = true;
  }
  else {
      console.log("The letter: " + x + " has previously been used...");
  }
}
}
return foundLetter;
}




function flipCharacter(indexOfLetter, letterToReveal) {
workingWord[indexOfLetter] = letterToReveal;
correctLetters =  correctLetters + " - " + letterToReveal;
}


function checkIfWon() {
for (i = 0; i < workingWord.length; i++) {
if (workingWord[i] == "_")
  return false;
}
return true;
}




printGuessedWordToWindow();

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(e) {

if ((numberOfAttempts - countersoFar) == 0) {
//Looses game, user tries another word
playWrong();
alert("Game Over! The correct word was " + choosenWord.join("").toUpperCase() +" :(" + " Try Again.");
restart();
}
else {
//Obtain character chosen
var letterChosen = e.key;
console.log("The letter chosen was " + letterChosen);
wrongLetters.innerHTML += letterChosen;


if (!checkIfExists(letterChosen)) {
  countersoFar++;
}

if (checkIfWon()) {
  playCorrect();
  alert("Good Job! The correct word was " + choosenWord.join("").toUpperCase() +" :)");
  restart();
  

}
else {
  var attemptsLeft = numberOfAttempts - countersoFar;
  console.log("Attempts Remaining: " + attemptsLeft);
  var previous = guessesLeft.innerHTML = attemptsLeft;

}
}
printGuessedWordToWindow();
printGuessedSoFarToWindow();
}





