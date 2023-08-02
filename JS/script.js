import { typingTest, inputField, displayText } from "./typing.js";

// DISPLAY TEXT ON THE SCREEN AND INITIALIZE TYPING TEST FUNCTION
displayText();
inputField.addEventListener("input", typingTest);
