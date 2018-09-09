let head = document.head || document.documentElement;
let myCss = document.createElement('link');
myCss.type = "text/css";
myCss.rel = "stylesheet";
myCss.href = chrome.runtime.getURL('iwara_mobile.css');
head.appendChild(myCss);

document.body.id = "IM-home";

chrome.runtime.sendMessage({turnedOn: true});