import { charIndex } from "./typing.js";

// TIMER
export function startTimer() {
  let testTime = 10;
  let timer = document.getElementById("timer");

  const timerInterval = setInterval(() => {
    testTime--;

    // update the timer with remaining time
    timer.textContent = testTime;

    // if the timer reaches 0, stop the timer
    if (testTime <= 0) {
      clearInterval(timerInterval);
      // ADD RESULTS, MEASUREMENTS, IMPROVEMENT
      updateTime();
      countWPM();
    }
  }, 1000);
}

// DATE
function updateTime() {
  // progress table
  const timeCell = document.getElementById("time-result");

  // current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  timeCell.textContent = `${date} \n ${time} \n`;
}

// WPM = (Number of characters typed ÷ 5) ÷ Time taken (in minutes)
export function countWPM() {
  const results = document.querySelectorAll(".wpm");
  let wpm = charIndex / 5;

  // loop through each element with the "wpm" class and set its content
  results.forEach((result) => {
    result.innerText = wpm.toFixed(0); // use toFixed(0) to round and convert it to a whole number
  });
}
