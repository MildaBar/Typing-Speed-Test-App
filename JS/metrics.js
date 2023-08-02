// // Function to start the typing test
// function startTypingTest() {
//   const startTime = new Date().getTime();
//   const typedText = document.getElementById("typingText").value;
//   const endTime = new Date().getTime();

//   const timeInSeconds = (endTime - startTime) / 1000;
//   const wordsTyped = typedText.trim().split(" ").length;
//   const wordsPerMinute = Math.round((wordsTyped / timeInSeconds) * 60);

//   const accuracy = calculateAccuracy(originalText, typedText);

//   const results = `Typing Speed: ${wordsPerMinute} WPM\nAccuracy: ${accuracy}%`;
//   document.getElementById("results").innerText = results;
// }

// // Function to calculate accuracy
// function calculateAccuracy(original, typed) {
//   const originalWords = original.trim().split(" ");
//   const typedWords = typed.trim().split(" ");

//   let correctWordCount = 0;
//   for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
//     if (originalWords[i] === typedWords[i]) {
//       correctWordCount++;
//     }
//   }

//   return Math.round((correctWordCount / originalWords.length) * 100);
// }
