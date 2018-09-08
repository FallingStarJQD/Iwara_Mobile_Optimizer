let head = document.head || document.documentElement;
let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
head.appendChild($myCss[0]);

$("body").attr("id", "IM-user");

let $views = $('#block-views-videos-block-2 .content .view-content, #block-views-images-block-3 .content .view-content');
$(".views-row > div", $views).unwrap();
$(".node a").attr('target', '_blank');

chrome.runtime.sendMessage({turnedOn: true});