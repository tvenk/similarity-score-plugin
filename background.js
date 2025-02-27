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
        const score = generateScoreWithAI(title, description, history);
        console.log("Generated score:", score); // Log the score
        sendResponse({ score }); // Send the score back to the content script
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
function generateScoreWithAI(title, description, history) {
  // Combine title and description into a single input
  const inputText = `${title}. ${description}`;

  console.log("Calling AI model with input:", inputText); // Log the AI input

  // Simulate AI processing (replace with actual AI call)
  const score = calculateCompositeScore(inputText, history);

  return score;
}

// Example function to calculate a composite score from input text and user history
function calculateCompositeScore(inputText, history) {
  // Extract keywords from the input text
  const keywords = extractKeywords(inputText);

  // Start at 0 for first-time searches
  let score = 0;

  // Increase score based on keyword matches in the user's history
  const historyMatches = history.filter(entry => {
    const entryKeywords = extractKeywords(entry.title);
    return keywords.some(keyword => entryKeywords.includes(keyword));
  });

  // Calculate the score based on the number of matches
  if (historyMatches.length > 0) {
    score += (historyMatches.length / history.length) * 100;
  }

  // Ensure the score does not exceed 100
  score = Math.min(score, 100);

  // Round the score to the nearest integer
  return Math.round(score);
}

// Function to extract keywords from text
function extractKeywords(text) {
  // Simple keyword extraction: split by spaces and remove common stop words
  const stopWords = ["the", "and", "a", "an", "in", "on", "at", "for", "with", "of", "to"];
  const words = text.toLowerCase().split(/\s+/);
  const keywords = words.filter(word => !stopWords.includes(word) && word.length > 2);
  return keywords;
}
