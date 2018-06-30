chrome.runtime.onMessage.addListener((message, sender)=>{
	chrome.downloads.download({
		url: message.url,
		filename: message.filename,
		saveAs: true
	});	
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.turnedOn === true) {
        chrome.browserAction.setBadgeText({text: ' on ', tabId: sender.tab.id});
    }
});