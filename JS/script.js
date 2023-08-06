import {
  typingTest,
  inputField,
  displayText,
  typingText,
  resetCharIndex,
} from "./typing.js";
import { showProgress } from "./progress.js";
import { timer, timerInterval, resetTestTime } from "./metrics.js";

let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");

// START TEST
startBtn.addEventListener("click", () => {
  startTest();
});

// start test function
function startTest() {
  // display text on the screen and initialize typing test function
  displayText();
  inputField.addEventListener("input", typingTest);
}

// RESET TEST
resetBtn.addEventListener("click", () => {
  resetTest();
  startTest();
});

// reset test function
function resetTest() {
  clearInterval(timerInterval);

  timer.textContent = 60;

  typingText.innerHTML = "";
  inputField.value = "";

  resetCharIndex(); // reset the charIndex to 0
  resetTestTime(); // reset the testTime to 0
}

// PROGRESS
showProgress();
