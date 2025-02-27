console.log("Content script loaded!"); // Log to verify the script is running

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
    console.log("Received scrapeData request"); // Log to verify the message is received

    // Scrape data from the current page
    const title = document.title;
    const url = window.location.href;
    const description = document.querySelector('meta[name="description"]')?.content || '';

    console.log("Scraped data:", { title, url, description }); // Log the scraped data

    // Send the scraped data to the background script
    chrome.runtime.sendMessage({ action: "processData", data: { title, url, description } }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background script:", chrome.runtime.lastError);
      } else {
        console.log("Response from background script:", response);
        sendResponse({ score: response?.score || null });
      }
    });

    // Return true to indicate async response
    return true;
  }
});
