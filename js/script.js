const inputs = document.querySelector(".inputs"),
      resetBtn = document.querySelector(".reset-btn"),
      hint = document.querySelector(".hint span"),
      guessLeft = document.querySelector(".guess-left span"),
      wrongLetter = document.querySelector(".wrong-letter span"),
      typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    // Getting random word from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;  // Getting the random word
    maxGuesses = 8;
    corrects = [];
    incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;

    let html = "";
    for(let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase(); // Convert to lowercase for consistency
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        if (word.includes(key)) {  // If the letter is in the word
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;  // Decrement maxGuesses by 1
            incorrects.push(key);
            guessLeft.innerText = maxGuesses;  // Update display after decrement
        }
    }
    wrongLetter.innerText = incorrects.join(", "); // Display wrong letters separated by commas
    typingInput.value = "";  // Clear input
    setTimeout(()=>{
        if (corrects.length===word.length){  // if user found all the letters
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randomWord(); // show all letters in the output
        }
        else if(maxGuesses<1){ // if user could not found all letters
            alert("Game overed! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                // Show all letters in the input
                    inputs.querySelectorAll("input")[i].value = word[i];
                }
        }
    });

}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", ()=>typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
