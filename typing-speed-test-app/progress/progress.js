// eslint-disable-next-line import/no-cycle, import/extensions
import { updateTime, countAccuracyAndWPM } from "../metrics/metrics.js";

/*
  ----- SHOW PROGRESS RESULTS -----
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
*/
function addNewResult(time, wpm, accuracy) {
  const progressTable = document.getElementById("progress-table");

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

  // center alignment to table cells
  timeCell.style.textAlign = "center";
  wpmCell.style.textAlign = "center";
  accuracyCell.style.textAlign = "center";

  // retrieve previous results from localStorage
  const prevWpm = localStorage.getItem("wpm");
  const prevAccuracy = localStorage.getItem("accuracy");
  const improvementElement = document.getElementById("improvement-results");

  // compare with previous results and display improvement message
  if (prevWpm && prevAccuracy) {
    const wpmImproved = wpm > prevWpm;
    const accuracyImproved = accuracy > prevAccuracy;

    let improvementMessage = "";

    if (wpmImproved && accuracyImproved) {
      improvementMessage =
        "TEST IS OVER <br> You have improved in both WPM and WORD ACCURACY! Good job!";
    } else if (wpmImproved) {
      improvementMessage =
        "TEST IS OVER <br> Your WPM improved, although keep practising on WORD ACCURACY";
    } else if (accuracyImproved) {
      improvementMessage =
        "TEST IS OVER <br> Your WORD ACCURACY improved, although keep practising on WPM";
    } else {
      improvementMessage = `TEST IS OVER <br> This time you didn't improved in both WPM and WORD ACCURACY. Keep practising!`;
    }
    improvementElement.innerHTML = improvementMessage;
  } else if (!prevWpm && !prevAccuracy) {
    improvementElement.textContent =
      "This is your first test! Start practising to check your improvements!";
  }

  localStorage.setItem("time", time);
  localStorage.setItem("wpm", wpm);
  localStorage.setItem("accuracy", accuracy);
}

/*
  ----- DISPLAY RESULTS WHEN TEST IS DONE -----
*/
export function testDone() {
  const metricsBorders = document.querySelectorAll(".metrics");
  metricsBorders.forEach((border) => {
    border.classList.add("done");
  });

  // call functions to get date/time, WPM, accuracy
  const timeResult = updateTime();
  const { accuracy, wpm } = countAccuracyAndWPM();

  // change improvement message
  const improvementElement = document.getElementById("improvement-results");
  improvementElement.style.color = "green";
  improvementElement.style.fontWeight = "bold";

  // add a new row with new results
  addNewResult(timeResult, wpm, accuracy);
}

/*
  ----- RETRIEVE PREVIOUS TEST RESULTS WHEN THE PAGE LOADS -----
  Page Load: execute the code block after the entire webpage has finished loading. The code retrieves the stored test results from local storage, displays them if available, and resets the improvement message accordingly
*/
window.onload = function () {
  const prevTime = localStorage.getItem("time");
  const prevWpm = localStorage.getItem("wpm");
  const prevAccuracy = localStorage.getItem("accuracy");

  if (prevTime && prevWpm && prevAccuracy) {
    addNewResult(prevTime, prevWpm, prevAccuracy);
  }

  // reset improvement section message
  const improvementElement = document.getElementById("improvement-results");
  const defaultImprovementMessage = "Start the test to check your improvements";
  improvementElement.textContent = defaultImprovementMessage;
  improvementElement.style.color = "";
  improvementElement.style.fontWeight = "";
};
