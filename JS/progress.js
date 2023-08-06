import { updateTime, countAccuracyAndWPM } from "./metrics.js";

/*
  ----- SHOW PROGRESS RESULTS -----
  Show Progress: The file exports the showProgress function, which adds an event listener to the "show more" icon. When clicked, the function toggles the display of the progress table.
*/
export function showProgress() {
  document.addEventListener("DOMContentLoaded", () => {
    const showMoreIcon = document.getElementById("show-more-icon");
    const progressTable = document.getElementById("progress-table-container");

    showMoreIcon.addEventListener("click", () => {
      if (progressTable.style.display === "none") {
        progressTable.style.display = "block";
      } else {
        progressTable.style.display = "none";
      }
    });
  });
}

/*
  ----- ADD NEW RESULTS AND DISPLAY IMPROVEMENT------
  Add New Results and Display Improvement: The file exports the addNewResult function, which adds a new row to the progress table with test results (time, WPM, and accuracy) and displays an improvement message based on the user's performance compared to previous results stored in the localStorage.
*/
function addNewResult(time, wpm, accuracy) {
  const progressTable = document.getElementById("progress-table");

  // create new row and cells
  //   const newRow = document.createElement("tr");

  // insert new row at the top of the table
  const timeCell = document.createElement("td");
  const wpmCell = document.createElement("td");
  const accuracyCell = document.createElement("td");
  const newRow = progressTable.insertRow(1);

  // set content of new cells
  timeCell.textContent = time;
  wpmCell.textContent = wpm;
  accuracyCell.textContent = accuracy;

  // append cells to the new row
  newRow.appendChild(timeCell);
  newRow.appendChild(wpmCell);
  newRow.appendChild(accuracyCell);

  // retrieve previous results from localStorage
  const prevWpm = localStorage.getItem("wpm");
  const prevAccuracy = localStorage.getItem("accuracy");
  let improvementElement = document.getElementById("improvement-results");

  // compare with previous results and display improvement message
  if (prevWpm && prevAccuracy) {
    const wpmImproved = wpm > prevWpm;
    const accuracyImproved = accuracy > prevAccuracy;

    let improvementMessage = "";

    if (wpmImproved && accuracyImproved) {
      improvementMessage =
        "You have improved in both WPM and WORD ACCURACY! Good job!";
    } else if (wpmImproved) {
      improvementMessage =
        "Your WPM improved, although keep practising on WORD ACCURACY";
    } else if (accuracyImproved) {
      improvementMessage =
        "Your WORD ACCURACY improved, although keep practising on WPM";
    } else {
      improvementMessage = `This time you didn't improved in both WPM and WORD ACCURACY. Keep practising!`;
    }
    improvementElement.textContent = improvementMessage;
  } else if (!prevWpm && !prevAccuracy) {
    improvementElement.textContent =
      "This is your first test! Keep practising to check your improvements!";
  }

  localStorage.setItem("time", time);
  localStorage.setItem("wpm", wpm);
  localStorage.setItem("accuracy", accuracy);
}

/*
  ----- DISPLAY RESULTS WHEN TEST IS DONE -----
  Test Done: The file exports the testDone function, which is called when the typing test is done. It updates the metrics section with test results, adds the new results to the progress table, and displays an improvement message based on the user's performance.
*/
export function testDone() {
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

/*
  ----- RETRIEVE PREVIOUS TEST RESULTS WHEN THE PAGE LOADS -----
  Page Load: The code adds an event listener to the document for the "DOMContentLoaded" event. When the page loads, it retrieves previous test results from localStorage and displays them if available.
*/
document.addEventListener("DOMContentLoaded", () => {
  const prevTime = localStorage.getItem("time");
  const prevWpm = localStorage.getItem("wpm");
  const prevAccuracy = localStorage.getItem("accuracy");

  if (prevTime && prevWpm && prevAccuracy) {
    // Display previous test results
    addNewResult(prevTime, prevWpm, prevAccuracy);
  }
});
