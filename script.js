const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const notificationContainer = document.getElementById("notification-container");
const popupContainer = document.getElementById("popup-container");
const figureParts = document.getElementsByClassName('figure-part');
const finalMsg = document.getElementById("final-message");
const playButton = document.getElementById("play-button");

const correctLetters = [];
const incorrectLetters = [];
const words = ["agape", "divine", "spirit", "universe", "presence", "being", "mindful"];

let randomWord = words[Math.floor(Math.random() * words.length)];


//Show congratulations message
function showCongratulationsMsg(word) {
	if (word === randomWord) {
    	finalMsg.innerText = "Congratulations! You won!"
    	popupContainer.style.display = "flex";
    }
}


function displayWord() {
	wordEl.innerHTML = 
		randomWord
			.split("")
				.map(
					letter => `
						<span class="letter">
							${correctLetters.includes(letter) ? letter : ''}
						</span>
						`
		        )
		        .join('')
    ;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    showCongratulationsMsg(innerWord);
}


//Show error for duplicate letters
function showNotification() {
	notificationContainer.classList.add('show');

	setTimeout(() => {
		notificationContainer.classList.remove('show');
	}, 2000);
}


//Check if lost
function showLostPopupMsg() {
	if (incorrectLetters.length == "6") {
		finalMsg.innerText = "Oops! You lost!";
		popupContainer.style.display = "flex";
	}
}


//Display body parts for wrong letters
function showBodyFigure() {	
	[...figureParts].forEach((part, index) => {
		if (index < incorrectLetters.length) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}

		showLostPopupMsg();
	})
}


//Display wrong letters
function updateWrongLettersEl() {
		wrongLettersEl.innerHTML = `
		${incorrectLetters.length ? `<p>Wrong</p>` : ""}  	
			${incorrectLetters
				.map(
					letter => `
						<span>${letter}</span>`
				)	 
			}	
		`;

		showBodyFigure();		
}


//Key down letter press
window.addEventListener("keypress", (e) => {
	const letter = e.key;
	if (e.keyCode >= 65 && e.keyCode <= 122) {
		
		//push the letter to correctLetters array
		if (randomWord.includes(letter)) {
			if(!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord(letter);
			}	
			else {
				showNotification();
			}
		//Push the letter to incorrectLetters array										
		} else {
			if(!incorrectLetters.includes(letter)) {
				incorrectLetters.push(letter);

				updateWrongLettersEl();
			}
		}
	} 
});


//Reset the game 
playButton.addEventListener("click", (event) => {
	correctLetters.splice(0);
	incorrectLetters.splice(0);

	randomWord = words[Math.floor(Math.random() * words.length)];
	console.log(randomWord);

	displayWord();
	updateWrongLettersEl();

	popupContainer.style.display = "none";

})


displayWord();