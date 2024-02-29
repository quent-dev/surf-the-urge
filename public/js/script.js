// Set timerStatus on installation
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      chrome.storage.local.set({
        timerStatus: "STOP",
      });
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //when a tab is updated while the time is running, alert the user
    // const timerStatus = localStorage.getItem("timerStatus")
    const timerStatus = getTimerStatus()
    if (timerStatus === 'START') {
        chrome.notifications.create("focus", {
            type: 'basic',
            iconUrl: "../icon.png",
            message: 'Try to stay focused!',
            title: 'Surf the Urge',
            priority: 2
        })
        console.log(`notification sent to tab ${tabId}`)
    }
});

async function getTimerStatus() {
    const timerStatus = await chrome.storage.local.get("timerStatus")
    console.log(timerStatus)
    return timerStatus
}