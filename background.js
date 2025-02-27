// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processData") {
    console.log("Received processData request"); // Log to verify the message is received

    const { title, url, description } = request.data;
    console.log("Processing data:", { title, url, description }); // Log the data

    // Fetch user history
    fetchUserHistory()
      .then(history => {
        // Call the AI model to generate a score
        generateScoreWithAI(title, description, history)
          .then(score => {
            console.log("Generated score:", score); // Log the score
            sendResponse({ score }); // Send the score back to the content script
          })
          .catch(error => {
            console.error("Error generating score:", error); // Log any errors
            sendResponse({ score: null }); // Send a null score if there's an error
          });
      })
      .catch(error => {
        console.error("Error fetching user history:", error); // Log any errors
        sendResponse({ score: null }); // Send a null score if there's an error
      });

    // Return true to indicate async response
    return true;
  }
});

// Function to fetch user history
function fetchUserHistory() {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text: '', maxResults: 100 }, (results) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to call the AI model and generate a score
async function generateScoreWithAI(title, description, history) {
  // Combine title and description into a single input
  const inputText = `${title}. ${description}`;

  console.log("Calling AI model with input:", inputText); // Log the AI input

  // Simulate AI processing (replace with actual AI call)
  const score = calculateCompositeScore(inputText, history);

  return score;
}

// Example function to calculate a composite score from input text and user history
function calculateCompositeScore(inputText, history) {
  // Placeholder logic: Replace with your own scoring algorithm
  // For demonstration, let's assume a simple similarity score based on keyword matching
  const keywords = ["AI", "technology", "DeepSeek", "YouTube"];
  const matches = keywords.filter(keyword => inputText.toLowerCase().includes(keyword.toLowerCase()));
  const historyMatches = history.filter(entry => keywords.some(keyword => entry.title.toLowerCase().includes(keyword.toLowerCase())));
  const score = (matches.length / keywords.length) * 100 + (historyMatches.length / history.length) * 100;
  return Math.round(score); // Normalize to 0-100
}
