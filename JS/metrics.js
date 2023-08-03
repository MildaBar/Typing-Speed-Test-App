import { charIndex, inputField, typingTest, typingText } from "./typing.js";

export let testTime = 60;
export let timer = document.getElementById("timer");
export let timerInterval;

// ----- TIMER -----
export function startTimer() {
  timerInterval = setInterval(() => {
    testTime--;

    // update the timer with remaining time
    timer.textContent = testTime;

    // if the timer reaches 0, stop the timer
    if (testTime <= 0) {
      clearInterval(timerInterval);
      // ADD RESULTS, MEASUREMENTS, IMPROVEMENT
      updateTime();
      countWPM();
      testDone();

      // stop further typing
      inputField.removeEventListener("input", typingTest);
    }
  }, 1000);
}

// ----- DATE AND TIME -----
function updateTime() {
  // progress table
  const timeCell = document.getElementById("time-result");

  // current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  timeCell.textContent = `${date} \n ${time} \n`;
}

// ----- WPM AND WORD ACCURACY -----
// (Number of characters typed / 5) / Time taken (in minutes)
// Word Accuracy (%) = (Number of Correct Words / Total Number of Words) * 100
export function countWPM() {
  const characters = typingText.querySelectorAll("span");
  const wordAccuracyElement = document.querySelectorAll(".accuracy");
  const results = document.querySelectorAll(".wpm");

  let correctChars = 0;
  let correctWords = 0;
  let totalWords = 0;

  // loop through each char and chech if it has correct class
  characters.forEach((char) => {
    if (char.classList.contains("correct")) {
      correctChars++;
      if (char.innerText === " ") {
        correctWords++;
      }
    }

    // count the total number of words
    if (char.innerText === " ") {
      totalWords++;
    }
  });

  const wordAccuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;
  let wpm = charIndex / 5;

  // loop through each element with the "wpm" class and set its content
  results.forEach((result) => {
    result.innerText = wpm.toFixed(0);
  });

  // loop through each element with the "accuracy" class and set its content
  wordAccuracyElement.forEach((element) => {
    element.textContent = wordAccuracy.toFixed(0);
  });
}

// ----- CHANGE COLORS -----
function testDone() {
  let metricsBorders = document.querySelectorAll(".metrics");
  metricsBorders.forEach((border) => {
    border.classList.add("done");
  });
}
