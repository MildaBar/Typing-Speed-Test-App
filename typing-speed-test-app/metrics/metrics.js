// eslint-disable-next-line import/no-cycle, import/extensions
import { inputField, typingTest, typingText } from "../typing/typing.js"
// eslint-disable-next-line import/no-cycle, import/extensions
import { testDone } from "../progress/progress.js";

/*
  ----- DATE AND TIME -----
*/
export function updateTime() {
  // current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const dateResult = `${date} \n ${time} \n`;
  return dateResult;
}

/*
  ----- COUNT WPM AND WORD ACCURACY -----
*/
export function countAccuracyAndWPM() {
  const characters = typingText.querySelectorAll("span");
  const wordAccuracyElement = document.querySelector(".accuracy");
  const wpmElement = document.querySelector(".wpm");

  let correctChars = 0;
  let correctWords = 0;
  let totalWords = 0;

  // loop through each char and check if it has correct class
  characters.forEach((char) => {
    if (char.classList.contains("correct") && char.innerText !== ' ') {
      correctChars += 1;
      if (char.innerText === " ") {
        correctWords += 1;
      }
    }
    if (char.innerText === " ") {
      totalWords += 1;
    }
  });

  // count wpm and accuracy
  const wordAccuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;
  const wpm = correctChars / 5;

  const accuracyResult = wordAccuracy.toFixed(0);
  const wpmResult = wpm.toFixed(0);

  // display wpm and accuracy in the metrics section
  wpmElement.textContent = wpmResult;
  wordAccuracyElement.textContent = accuracyResult;

  return {
    accuracy: accuracyResult,
    wpm: wpmResult,
  };
}

/*
  ----- TIMER -----
*/

let testTime = 10;
export const timer = document.getElementById("timer");
export let timerInterval;

// export testTime variable for reset btn
export function resetTestTime() {
  testTime = 10;
}

// start timer function
export function startTimer() {
  timerInterval = setInterval(() => {
    testTime -= 1;

    // update the timer with remaining time
    timer.textContent = testTime;

    // if the timer reaches 0, stop the timer
    if (testTime <= 0) {
      clearInterval(timerInterval);
      updateTime();
      countAccuracyAndWPM();
      testDone();

      // stop further typing
      inputField.removeEventListener("input", typingTest);
    }
  }, 1000);
}

