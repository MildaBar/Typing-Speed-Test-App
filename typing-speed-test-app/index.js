import {
  typingTest,
  inputField,
  displayText,
  typingText,
  resetCharIndex,
  setTestIsGoing,
  testIsGoing
// eslint-disable-next-line import/extensions
} from "./typing/typing.js";
// eslint-disable-next-line import/extensions
import { showProgress } from "./progress/progress.js";
// eslint-disable-next-line import/extensions
import { timer, timerInterval, resetTestTime } from "./metrics/metrics.js";

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

/*
  ----- START TEST -----
*/

function startTest() {
  displayText();
  inputField.addEventListener("input", typingTest);
}

/*
  ----- RESET TEST -----
*/


function resetTest() {
  // change wpm and accuracy elements on the metrics section
  const wordAccuracyElement = document.querySelector(".accuracy");
  const wpmElement = document.querySelector(".wpm");

  wordAccuracyElement.textContent = 0;
  wpmElement.textContent = 0;

  // change border color of metrics section
const metricsBorders = document.querySelectorAll(".metrics");
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
  const improvementElement = document.getElementById("improvement-results");
  improvementElement.textContent = "Start test to check your improvements";
  improvementElement.style.color = "";
  improvementElement.style.fontWeight = "";

  // reset charIndex and testTime to 0
  resetCharIndex();
  resetTestTime();
}

/*
  ----- PROGRESS -----
*/
showProgress();


/*
  ----- START AND RESET TEST WITH BUTTONS AND ENTER/ESC KEYS -----
  */

// begin test when test is  not going
function beginTest() {
  if(!testIsGoing) {
    setTestIsGoing(true)
    startTest();
  }
}

// start test with ENTER key
function startTestEnter() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      beginTest();
    }
  })
};

// reset test with ESC key
function resetTestEsc() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      resetTest();
      startTest();
    }
  })
}

startTestEnter()
resetTestEsc()


// START AND RESET BUTTONS
startBtn.addEventListener("click", () => {
  startTest();
});

resetBtn.addEventListener("click", () => {
  resetTest();
  startTest();
});