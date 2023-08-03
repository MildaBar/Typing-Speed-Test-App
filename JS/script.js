import { typingTest, inputField, displayText, typingText } from "./typing.js";
import { showProgress } from "./progress.js";
import { startTimer, timer, timerInterval } from "./metrics.js";

let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");

// START TEST
startBtn.addEventListener("click", () => {
  startTest();
});

function startTest() {
  // display text on the screen and initialize typing test function
  displayText();
  inputField.addEventListener("input", typingTest);
}

// RESET TEST
resetBtn.addEventListener("click", () => {
  resetTest();
});

function resetTest() {
  clearInterval(timerInterval);

  let testTime = 60;
  timer.textContent = testTime;

  typingText.innerHTML = "";
  inputField.value = "";

  inputField.removeEventListener("input", typingTest);
}

// PROGRESS
showProgress();
