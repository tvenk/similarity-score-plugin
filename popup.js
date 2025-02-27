document.getElementById("generateScore").addEventListener("click", () => {
  console.log("Generate Score button clicked!"); // Log to verify the button works

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log("Active tab:", activeTab); // Log the active tab

    // Send a message to the content script
    chrome.tabs.sendMessage(activeTab.id, { action: "scrapeData" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Response from content script:", response);
        if (response && response.score !== undefined) {
          document.getElementById("scoreResult").innerText = `Score: ${response.score}`;
        } else {
          console.error("No score received from content script");
        }
      }
    });
  });
});
