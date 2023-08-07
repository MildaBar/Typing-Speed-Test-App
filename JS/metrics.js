import { charIndex, inputField, typingTest, typingText } from "./typing.js";
import { testDone } from "./progress.js";

/*
  ----- TIMER -----
  Timer Functions: The file exports two functions, startTimer and resetTestTime. The startTimer function sets up an interval to update the timer every second, while the resetTestTime function resets the testTime variable to 50 seconds for test restart.
*/

let testTime = 60;
export let timer = document.getElementById("timer");
export let timerInterval;

// export testTime variable for reset btn
export function resetTestTime() {
  testTime = 60;
}

// start timer function
export function startTimer() {
  timerInterval = setInterval(() => {
    testTime--;

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

/*
  ----- DATE AND TIME -----
  Date and Time: The file exports the updateTime function, which retrieves the current date and time and returns a formatted string representation.
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
  Count WPM and Word Accuracy: The file exports the countAccuracyAndWPM function, which calculates the word accuracy and WPM based on the user's typing performance. It counts correct characters and correct words, then calculates and updates the metrics section with the accuracy and WPM values.
*/
export function countAccuracyAndWPM() {
  const characters = typingText.querySelectorAll("span");
  const wordAccuracyElement = document.querySelector(".accuracy");
  const wpmElement = document.querySelector(".wpm");

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
    if (char.innerText === " ") {
      totalWords++;
    }
  });

  // count wpm and accuracy
  const wordAccuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;
  let wpm = correctChars / 5;

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
