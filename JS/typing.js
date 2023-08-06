import { startTimer } from "./metrics.js";

export let typingText = document.querySelector(".typing-text p");
export const inputField = document.getElementById("input-field");

/*
  ----- FETCH DATA -----
  fetchData: The file exports the fetchData function, which fetches a poem's lines from a public API and returns a random paragraph of a specified length for the typing test.
*/
export async function fetchData(paragraphLength) {
  try {
    const response = await fetch(
      "https://poetrydb.org/title/Alastor: Or, the Spirit of Solitude/lines.json"
    );
    const data = await response.json();
    const lines = data[0].lines;

    // get random start index
    const startIndex = Math.floor(
      Math.random() * (lines.length - paragraphLength + 1)
    );
    // get paragraph
    const paragraph = lines.slice(startIndex, startIndex + paragraphLength);

    const text = paragraph.join(" ");
    return text;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

/*
  ----- DISPLAY TEXT ON THE SCREEN -----
  Display Text on the Screen: The file exports the displayText function, which fetches a paragraph of text using fetchData and displays it on the screen for the user to practice typing. The function formats the paragraph into individual characters, wraps them in <span> elements, and adds the "active" class to the first character.
*/
export async function displayText() {
  try {
    let paragraphLength = 10;
    let text = await fetchData(paragraphLength);
    typingText.innerHTML = "";
    typingText.style.whiteSpace = "";

    // use forEach to iterate over each character in the text array
    text.split("").forEach((char) => {
      let span = `<span>${char}</span>`;
      typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inputField.focus());
    document.addEventListener("click", () => inputField.focus());
  } catch (error) {
    // handle the error here if needed
    console.log("Error displaying text:", error);
  }
}

/*
  ----- TYPING TEST -----
  Typing Test: The file exports the typingTest function, which handles the typing test as the user types. It compares the typed characters with the expected characters, adds classes ("correct" or "incorrect") to the characters based on user input, and moves the "active" class to the current character being typed.
*/

// keep track of the current index of the char being typed
export let charIndex = 0;

// export charIndex variable for reset btn
export function resetCharIndex() {
  charIndex = 0;
}

// this function is triggered whenever there is an input change in the input field
export function typingTest() {
  if (charIndex === 0) {
    startTimer();
  }

  let characters = typingText.querySelectorAll("span");

  // get the current text typed in the input field
  let typedText = inputField.value;

  // check if the charIndex is within a valid range
  if (charIndex < characters.length && charIndex >= 0) {
    // get the character at the current charIndex from the typed text
    let typedChar = typedText.slice(charIndex, charIndex + 1);

    // if the typed character is null, it means the user is backspacing
    if (typedChar == "") {
      // if the charIndex is greater than 0, the user is backspacing
      if (charIndex > 0) {
        // decrement the character index and remove correct and incorrect classes
        charIndex--;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      // if the charIndex is valid, check if the typed char matches the expected char
      if (characters[charIndex].innerText == typedChar) {
        // if it matches, add the correct class to the char
        characters[charIndex].classList.add("correct");
      } else {
        // if it doesn't match, add the incorrect class to the char
        characters[charIndex].classList.add("incorrect");
      }
      // move to the next charIndex
      charIndex++;
    }

    // remove the "active" class from all chars
    characters.forEach((span) => span.classList.remove("active"));

    // add the "active" class to the char at the current charIndex
    if (charIndex >= 0 && charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }
  }
}
