import { startTimer } from "./metrics.js";

export let typingText = document.querySelector(".typing-text p");
export const inputField = document.getElementById("input-field");

// FETCH DATA
export async function fetchData() {
  try {
    const response = await fetch(
      "https://poetrydb.org/title/Ozymandias/lines.json"
    );
    const data = await response.json();
    const lines = data[0].lines;
    const text = lines.join(" ");
    return text;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error to handle it later if needed
  }
}

// DISPLAY TEXT ON THE SCREEN
export async function displayText() {
  try {
    let text = await fetchData();
    typingText.innerHTML = "";
    typingText.style.whiteSpace = "";

    // Use forEach to iterate over each character in the text array
    text.split("").forEach((char) => {
      let span = `<span>${char}</span>`;
      typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inputField.focus());
    document.addEventListener("click", () => inputField.focus());
  } catch (error) {
    // Handle the error here if needed
    console.log("Error displaying text:", error);
  }
}

// TYPING TEST

// ------------------------------------------
// Trigger the typing test and start the timer when the user starts typing
export function startTypingTest() {
  startTimer(charIndex); // Start the timer
  typingTest(); // Start the typing test
}
// -----------------------------------------------

// Keep track of the current index of the char being typed
let charIndex = 0;

// This function is triggered whenever there is an input change in the input field
export function typingTest() {
  let characters = typingText.querySelectorAll("span");

  // Get the current text typed in the input field
  let typedText = inputField.value;

  // Check if the charIndex is within a valid range
  if (charIndex < characters.length && charIndex >= 0) {
    // Get the character at the current charIndex from the typed text
    let typedChar = typedText.slice(charIndex, charIndex + 1);

    // If the typed character is null, it means the user is backspacing
    if (typedChar == "") {
      // If the charIndex is greater than 0, the user is backspacing
      if (charIndex > 0) {
        // Decrement the character index and remove correct and incorrect classes
        charIndex--;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      // If the charIndex is valid, check if the typed char matches the expected char
      if (characters[charIndex].innerText == typedChar) {
        // If it matches, add the correct class to the char
        characters[charIndex].classList.add("correct");
      } else {
        // If it doesn't match, add the incorrect class to the char
        characters[charIndex].classList.add("incorrect");
      }
      // Move to the next charIndex
      charIndex++;
    }

    // Remove the "active" class from all chars
    characters.forEach((span) => span.classList.remove("active"));

    // Add the "active" class to the char at the current charIndex
    if (charIndex >= 0 && charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }
  }
}
