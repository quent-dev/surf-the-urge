// Set timerStatus on installation
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      chrome.storage.local.set({
        timerStatus: "STOP",
      });
    }
  });



chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "time-is-up") {
        //our alarm is running, send notification
        chrome.notifications.create("countdown", {
            type: 'basic',
            iconUrl: "../icon.png",
            message: 'Time is up! Your focus time is over.',
            title: 'Surf the Urge',
            priority: 2
          })
    }
});



// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     //when a tab is updated while the time is running, alert the user
//     // const timerStatus = localStorage.getItem("timerStatus")
//     if (timerStatus === 'START') {
//         chrome.notifications.create("focus", {
//             type: 'basic',
//             iconUrl: "../icon.png",
//             message: 'Try to stay focused!',
//             title: 'Surf the Urge',
//             priority: 2
//         })
//         console.log(`notification sent to tab ${tabId}`)
//     }
// });