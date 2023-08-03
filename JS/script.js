import { typingTest, inputField, displayText } from "./typing.js";
import { showProgress } from "./progress.js";

let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");

// START TEST
startBtn.addEventListener("click", () => {
  // DISPLAY TEXT ON THE SCREEN AND INITIALIZE TYPING TEST FUNCTION
  displayText();
  inputField.addEventListener("input", typingTest);
});

// RESET TEST
// resetBtn.addEventListener("click", () => {
//   testTime = 60;
// });

// PROGRESS
// show progress
showProgress();
