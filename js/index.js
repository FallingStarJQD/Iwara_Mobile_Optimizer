let head = document.head || document.documentElement;
let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
head.appendChild($myCss[0]);

$("body").attr("id", "IM-index");

$("#block-system-main .view-content .views-row .views-column").unwrap();
$(".views-column a").attr('target', '_blank');

chrome.runtime.sendMessage({turnedOn: true});