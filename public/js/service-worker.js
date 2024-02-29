chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "time-is-up") {
        //our alarm is running, send notification
        console.log("Time is up! Your focus time is over.");
        chrome.notifications.create("countdown", {
            iconUrl: "../icon.png",
            message: 'Time is up! Your focus time is over.',
            type: 'basic',
            title: 'Surf the Urge',
          })
    }
});