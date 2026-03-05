let activeTab = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  trackTime();
  const tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = new URL(tab.url).hostname;
  startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackTime();
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
  }
});

function trackTime() {
  if (!activeTab) return;

  const timeSpent = Math.floor((Date.now() - startTime) / 1000);

  chrome.storage.local.get([activeTab], (result) => {
    const previousTime = result[activeTab] || 0;

    chrome.storage.local.set({
      [activeTab]: previousTime + timeSpent
    });
  });
}