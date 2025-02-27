document.getElementById("generateScore").addEventListener("click", () => {
  console.log("Generate Score button clicked!"); // Log to verify the button works

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log("Active tab:", activeTab); // Log the active tab

    // Send a message to the background script with the active tab's URL and title
    chrome.runtime.sendMessage({
      action: "processData",
      data: {
        title: activeTab.title,
        url: activeTab.url
      }
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background script:", chrome.runtime.lastError);
      } else {
        console.log("Response from background script:", response);
        if (response && response.score !== undefined) {
          document.getElementById("scoreResult").innerText = `Score: ${response.score}`;
        } else {
          document.getElementById("scoreResult").innerText = "No score available";
        }
      }
    });
  });
});
