// eslint-disable-next-line import/no-cycle, import/extensions
import { startTimer } from "../metrics/metrics.js";

export const typingText = document.querySelector(".typing-text p");
export const inputField = document.getElementById("input-field");

/*
  ----- FETCH DATA -----
*/
export async function fetchData(paragraphLength) {
  try {
    const response = await fetch(
      "https://poetrydb.org/title/Alastor: Or, the Spirit of Solitude/lines.json"
    );

    if (!response.ok) {
      throw new Error(`API request failed. Status: ${  response.status}`);
    }

    const data = await response.json();
    const {lines} = data[0];

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      throw new Error("Invalid or empty data received from the API.");
    }

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
*/
export async function displayText() {
  try {
    const paragraphLength = 10;
    typingText.innerHTML = "Loading poem...";
    const text = await fetchData(paragraphLength);
    typingText.innerHTML = "";

    // iterate over each character in the text array
    text.split("").forEach((char) => {
      const span = `<span>${char}</span>`;
      typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inputField.focus());
    document.addEventListener("click", () => inputField.focus());
  } catch (error) {
    console.log("Error displaying text:", error);
  }
}

/*
  ----- TYPING TEST -----
*/

export let testIsGoing = false;

export function setTestIsGoing() {
  testIsGoing = false;
}

// keep track of the current index of the char being typed
let charIndex = 0;

// export charIndex variable for reset btn
export function resetCharIndex() {
  charIndex = 0;
}

// function is triggered whenever there is an input change in the input field
export function typingTest() {
  if (charIndex === 0) {
    startTimer();
    testIsGoing = true;
  }

  const characters = typingText.querySelectorAll("span");
  let currentWord = "";
  let inWord = false;

  // get the current text typed in the input field
  const typedText = inputField.value;

  // check if the charIndex is within a valid range
  if (charIndex < characters.length && charIndex >= 0) {
    // get the character at the current charIndex from the typed text
    const typedChar = typedText.slice(charIndex, charIndex + 1);

    // if the typed character is null, it means the user is backspacing
    if (typedChar === "") {
      // if the charIndex is greater than 0, the user is backspacing
      if (charIndex > 0) {
        charIndex -= 1;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      // if the charIndex is valid, check if the typed char matches the expected char
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("incorrect");
      }
      // move to the next charIndex
      charIndex += 1;
    }

    // HIGLIGHT THE CURRENT WORD
    // check if the typed char is a space (end of a word)
    if (typedChar === " ") {
      if (inWord) {
        // loop through chars of the current word and add the underline class
        for (let i = charIndex - currentWord.length - 1; i < charIndex; i += 1) {
          characters[i].classList.add("underline");
        }
      }
      // reset the variables
      currentWord = "";
      inWord = false;
    } else {
      // append the typed char to the currentWord
      currentWord += typedChar;
      inWord = true;
      // loop through chars of the current word and add the underline class
      for (let i = charIndex - currentWord.length; i < charIndex; i += 1) {
        characters[i].classList.add("underline");
      }
    }

    // remove the "active" class from all chars
    characters.forEach((span) => span.classList.remove("active"));

    // add the "active" class to the char at the current charIndex
    if (charIndex >= 0 && charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }
  }
}
