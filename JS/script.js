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

/*
  ----- START TEST -----
  Start Test Function: The startTest function displays text on the screen for the user to type and attaches an event listener to the input field to handle the typing test.
*/
startBtn.addEventListener("click", () => {
  startTest();
});

function startTest() {
  // display text on the screen and initialize typing test function
  displayText();
  inputField.addEventListener("input", typingTest);
}

/*
  ----- RESET TEST -----
  Reset Test Function: The resetTest function resets various elements and metrics related to the typing test, clears the test timer, and sets the text and input field to empty.
*/
resetBtn.addEventListener("click", () => {
  resetTest();
  startTest();
});

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
  timer.textContent = 60;

  // set text and input field to empty
  typingText.innerHTML = "";
  inputField.value = "";

  // clear improvement message to empty
  let improvementElement = document.getElementById("improvement-results");
  improvementElement.textContent = "Start test to check your improvements";
  improvementElement.style.color = "";
  improvementElement.style.fontWeight = "";

  // reset charIndex and testTime to 0
  resetCharIndex();
  resetTestTime();
}

/*
  ----- PROGRESS -----
  Progress Display: The function showProgress() is called to display the progress of the typing test.
*/
showProgress();

/*
  ----- ENTER AND ESC KEYS -----
  Event Listeners: The code adds event listeners to the document for the Enter and Escape keys. Pressing Enter will start the typing test, and pressing Escape will reset the test and then start it again.
  */
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    startTest();
  } else if (event.key === "Escape") {
    resetTest();
    startTest();
  }
});
