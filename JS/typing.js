import { startTimer } from "./metrics.js";

export let typingText = document.querySelector(".typing-text p");
export const inputField = document.getElementById("input-field");

/*
  ----- FETCH DATA -----
  fetchData: fetch a poem's lines from a public API and return a random paragraph of a specified length for the typing test.
*/
export async function fetchData(paragraphLength) {
  try {
    const response = await fetch(
      "https://poetrydb.org/title/Alastor: Or, the Spirit of Solitude/lines.json"
    );

    /*
      Description: condition checks the 'ok' property of the response object

      Explanation: 'ok' property indicates whether the API request was successful or not.

      If the API request returns a non-successful status code (HTTP status code (200)), it means the request failed, and the code throws an error with a message including the specific status code received from the API response
    */
    if (!response.ok) {
      throw new Error("API request failed. Status: " + response.status);
    }

    const data = await response.json();
    const lines = data[0].lines;

    /*
      Description: check the variable lines, which contains an array of poetry lines retrieved from the API

      Explanation: if any of these three conditions are true, it means that the lines variable either does not exist, is not an array or is an empty array, indicating that there was an issue with the data received from the API
    */
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
  Display Text on the Screen: the displayText function fetches a paragraph of text using fetchData and displays it on the screen for the user to practice typing. The function formats the paragraph into individual characters, wraps them in <span> elements, and adds the "active" class to the first character.
*/
export async function displayText() {
  try {
    let paragraphLength = 10;
    typingText.innerHTML = "Loading poem...";
    let text = await fetchData(paragraphLength);
    typingText.innerHTML = "";

    // iterate over each character in the text array
    text.split("").forEach((char) => {
      let span = `<span>${char}</span>`;
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
  Typing Test: typingTest function handles the typing test as the user types. It compares the typed characters with the expected characters, adds classes ("correct" or "incorrect") to the characters based on user input, and moves the "active" class to the current character being typed.
*/

// keep track of the current index of the char being typed
export let charIndex = 0;

// export charIndex variable for reset btn
export function resetCharIndex() {
  charIndex = 0;
}

// function is triggered whenever there is an input change in the input field
export function typingTest() {
  if (charIndex === 0) {
    startTimer();
  }

  let characters = typingText.querySelectorAll("span");
  let currentWord = "";
  let inWord = false;

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
        charIndex--;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      // if the charIndex is valid, check if the typed char matches the expected char
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("incorrect");
      }
      // move to the next charIndex
      charIndex++;
    }

    // HIGLIGHT THE CURRENT WORD
    // check if the typed char is a space (end of a word)
    if (typedChar === " ") {
      if (inWord) {
        // loop through chars of the current word and add the underline class
        for (let i = charIndex - currentWord.length - 1; i < charIndex; i++) {
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
      for (let i = charIndex - currentWord.length; i < charIndex; i++) {
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
