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

// ----- START TEST -----
startBtn.addEventListener("click", () => {
  startTest();
});

// start test function
function startTest() {
  // display text on the screen and initialize typing test function
  displayText();
  inputField.addEventListener("input", typingTest);
}

// ----- RESET TEST -----
resetBtn.addEventListener("click", () => {
  resetTest();
  startTest();
});

// reset test function
function resetTest() {
  // change wpm and accuracy elements on the metrics section
  const wordAccuracyElement = document.querySelector(".accuracy");
  const wpmElement = document.querySelector(".wpm");

  wordAccuracyElement.textContent = 0;
  wpmElement.textContent = 0;

  // change border color of metrics section
  let metricsBorders = document.querySelectorAll(".metrics");
  metricsBorders.forEach((border) => {
    border.classList.remove("done");
  });

  // clear interval - the timer stops counting once the test is reset
  clearInterval(timerInterval);

  // change timer value to 60 s
  timer.textContent = 10;

  // set text and input field to empty
  typingText.innerHTML = "";
  inputField.value = "";

  // clear improvement message to empty
  let improvementElement = document.getElementById("improvement-results");
  improvementElement.textContent = "Start test to check your improvements";

  // reset charIndex and testTime to 0
  resetCharIndex();
  resetTestTime();
}

// ----- PROGRESS -----
showProgress();
