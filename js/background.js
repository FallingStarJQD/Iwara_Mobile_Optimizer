chrome.runtime.onMessage.addListener((message, sender)=>{
	if(message.url){
		chrome.downloads.download({
			url: message.url,
			filename: message.filename,
			saveAs: true
		});
	}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.turnedOn === true) {
        chrome.browserAction.setBadgeText({text: ' on ', tabId: sender.tab.id});
    }
});

chrome.webRequest.onBeforeRequest.addListener( details => {
		return {cancel: true};
	}, {
		urls: [ "*://ajax.googleapis.com/*", "*://www.google-analytics.com/*" ],
		types: ["script"]
	}, ["blocking"]
);