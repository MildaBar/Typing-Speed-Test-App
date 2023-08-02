// TIMER
export function startTimer(charIndex) {
  let testTime = 10;
  let timer = document.getElementById("timer");

  const timerInterval = setInterval(() => {
    testTime--;

    // update the timer with remaining time
    timer.textContent = testTime;

    // if the timer reaches 0, stop the timer
    if (testTime <= 0) {
      clearInterval(timerInterval);
      updateTime();
      countWPM(charIndex);
      // ADD RESULTS TO IMPROVEMENT SECTION
    }
  }, 1000);
}

// DATE
// update the table with current date and time
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
function countWPM(charIndex) {
  const results = document.querySelectorAll(".wpm");
  let wpm = charIndex / 5;
  // Loop through each element with the "wpm" class and set its content
  results.forEach((result) => {
    console.log("Setting WPM value to:", wpm.toFixed(0));
    result.innerText = wpm.toFixed(0); // Use toFixed(0) to round and convert it to a whole number
  });
}
