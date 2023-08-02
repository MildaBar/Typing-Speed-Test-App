// SHOW PROGRESS RESULTS
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
