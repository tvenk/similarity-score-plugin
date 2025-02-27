document.getElementById("generateScore").addEventListener("click", () => {
  console.log("Generate Score button clicked!"); // Log to verify the button works

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log("Active tab:", activeTab); // Log the active tab

<<<<<<< HEAD
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
=======
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
>>>>>>> 3d71421ed9f212c2dd62637b45f8dced8ed02d67
        }
      }
    });
  });
});
