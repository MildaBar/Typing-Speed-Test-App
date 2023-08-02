// FETCH DATA
let text = "";
export function fetchData() {
  fetch("https://poetrydb.org/title/Ozymandias/lines.json")
    .then((response) => response.json())
    .then((data) => {
      const lines = data[0].lines;
      text = lines.join(" ");
      displayText();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Display the fetched text
function displayText() {
  let textElement = document.getElementById("text");
  textElement.innerText = text;
  textElement.style.whiteSpace = "nowrap";
}

// Initialization function
export function initializeData() {
  document.addEventListener("DOMContentLoaded", () => {
    fetchData();
  });
}
