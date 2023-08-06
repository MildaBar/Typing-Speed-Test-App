// let textElement = document.querySelector(".typing-text p");
// let typingSpace = document.getElementById("typing-space");

// // START AND RESET THE TEST
// const startBtn = document.getElementById("start-btn");
// const resetBtn = document.getElementById("reset-btn");

// startBtn.addEventListener("click", () => {
//   fetchData();
// });

// resetBtn.addEventListener("click", () => {
//   resetTest();
// });

// // FETCH DATA
// let text = "";
// let allCharacters = [];

// async function fetchData() {
//   try {
//     const response = await fetch(
//       "https://poetrydb.org/title/Ozymandias/lines.json"
//     );
//     const data = await response.json();
//     const lines = data[0].lines;
//     text = lines.join(" ");
//     displayText();
//   } catch (error) {
//     console.log("Error fetching data:", error);
//   }
// }

// // DISPLAY TEXT ON THE SCREEN
// function displayText() {
//   textElement.innerText = text;
//   textElement.style.whiteSpace = "nowrap";
//   typingSpace.classList.add("active");

//   textElement.innerText = ""; // Clear the existing content of the textElement.
//   const characters = text.split(""); // Split the paragraph text into individual characters.
//   const textWithSpans = characters
//     .map((char, index) => `<span id="char-${index}">${char}</span>`)
//     .join(""); // Wrap each character in a span with a unique ID.
//   textElement.innerHTML = textWithSpans; // Set the HTML content of the textElement to the new structure.
//   // Start the typing effect using a delay between characters.

//   allCharacters = textElement.querySelectorAll("span");

//   let currentIndex = 0;
//   const typingInterval = setInterval(() => {
//     allCharacters[currentIndex].classList.add("active");
//     currentIndex++;
//     if (currentIndex >= allCharacters.length) {
//       clearInterval(typingInterval);
//       enableUserInput();
//     }
//   }, 100); // Adjust the interval time as per your preference.
// }

// // Function to enable user input
// function enableUserInput() {
//   // Make the first letter active (ready for typing)
//   allCharacters[0].classList.add("active");

//   // Add an event listener to listen for user input
//   document.addEventListener("keydown", handleUserInput);
// }

// // Function to handle user input
// function handleUserInput(event) {
//   const keyPressed = event.key;
//   const currentActiveIndex = Array.from(allCharacters).findIndex((char) =>
//     char.classList.contains("active")
//   );

//   if (currentActiveIndex >= 0) {
//     const currentCharacter = allCharacters[currentActiveIndex].innerText;

//     if (keyPressed === currentCharacter) {
//       // Correct key pressed, update the active class to the next character
//       allCharacters[currentActiveIndex].classList.remove("active");
//       allCharacters[currentActiveIndex + 1].classList.add("active");
//     }
//   }
// }

// // let timer;
// // let totalTime = 60;
// // let charIndex = 0;
// // let mistakes = 0;
// // let isTyping = false;

// // inputField.addEventListener("input", () => {
// //   if (!isTyping) {
// //     // call initTimer function to set up the timer
// //     timer = setInterval(initTimer, 1000);
// //     isTyping = true;
// //   }
// //   typingTest();
// // });

// // function typingTest() {
// //   let typedChar = inputField.value.split("")[charIndex];

// //   // backspace key
// //   if (typedChar == null) {
// //     // if the currect char index is not the first, you can move back one char in the text
// //     if (charIndex > 0) {
// //       charIndex--;
// //       // check for mistakes
// //       if (allCharacters[charIndex].classList.contains("incorrect")) {
// //         mistakes--;
// //       }
// //       // remove classes correct and incorrect
// //       allCharacters[charIndex].classList.remove("correct", "incorrect");
// //     }
// //   } else {
// //     if (allCharacters[charIndex].innerText == typedChar) {
// //       allCharacters[charIndex].classList.add("correct");
// //     } else {
// //       mistakes++;
// //       allCharacters[charIndex].classList.add("incorrect");
// //     }
// //     charIndex++;
// //   }

// //   allCharacters.forEach((span) => span.classList.remove("active"));

// //   allCharacters[charIndex].classList.add("active");
// // }

// // function initTimer() {
// //   if (totalTime > 0) {
// //     totalTime--;
// //     document.getElementById("timer").innerText = totalTime;

// //     // calculate WPM
// //     let wpm = Math.round(charIndex / 5 / ((60 - totalTime) / 60));
// //     document.getElementById("typing-speed").innerText = wpm;
// //   } else {
// //     clearInterval(timer);
// //     inputField.value = "";
// //   }
// // }

// // function resetTest() {
// //   totalTime = 60;
// //   charIndex = 0;
// //   mistakes = 0;
// //   isTyping = false;

// //   allCharacters.forEach((span) =>
// //     span.classList.remove("correct", "incorrect", "active")
// //   );
// //   inputField.value = "";
// //   inputField.blur();
// //   document.getElementById("timer").innerText = totalTime;
// //   document.getElementById("typing-speed").innerText = "0";
// //   document.getElementById("word-accuracy").innerText = "0";
// // }

// // // Initialization function
// // function initializeData() {
// //   document.addEventListener("DOMContentLoaded", () => {
// //     fetchData();
// //   });
// // }

// // initializeData();
