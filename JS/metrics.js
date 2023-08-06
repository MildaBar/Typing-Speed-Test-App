import { charIndex, inputField, typingTest, typingText } from "./typing.js";

let testTime = 10;

// export testTime variable for reset btn
export function resetTestTime() {
  testTime = 10;
}

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
      countAccuracyAndWPM();
      testDone();

      // stop further typing
      inputField.removeEventListener("input", typingTest);
    }
  }, 1000);
}

// ----- DATE AND TIME -----
function updateTime() {
  // current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const dateResult = `${date} \n ${time} \n`;
  return dateResult;
}

// ----- COUNT WPM AND WORD ACCURACY -----
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

    // count the total number of words
    if (char.innerText === " ") {
      totalWords++;
    }
  });

  // count wpm and accuracy
  const wordAccuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;
  let wpm = charIndex / 5;

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

// ----- ADD NEW RESULTS ------
function addNewResult(time, wpm, accuracy) {
  const progressTable = document.getElementById("progress-table");

  // create new row and cells
  const newRow = document.createElement("tr");
  const timeCell = document.createElement("td");
  const wpmCell = document.createElement("td");
  const accuracyCell = document.createElement("td");

  // set content of new cells
  timeCell.textContent = time;
  wpmCell.textContent = wpm;
  accuracyCell.textContent = accuracy;

  // append cells to the new row
  newRow.appendChild(timeCell);
  newRow.appendChild(wpmCell);
  newRow.appendChild(accuracyCell);

  progressTable.appendChild(newRow);

  localStorage.setItem("time", time);
  localStorage.setItem("wpm", wpm);
  localStorage.setItem("accuracy", accuracy);
}

// ----- DISPLAY RESULTS WHEN TEST IS DONE -----
function testDone() {
  let metricsBorders = document.querySelectorAll(".metrics");
  metricsBorders.forEach((border) => {
    border.classList.add("done");
  });

  // call functions to get date/time, WPM, accuracy
  const timeResult = updateTime();
  const { accuracy, wpm } = countAccuracyAndWPM();

  // add a new row with new results
  addNewResult(timeResult, wpm, accuracy);
}
