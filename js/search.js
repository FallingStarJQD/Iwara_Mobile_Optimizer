$("meta[name=viewport]").attr('content', 'width=device-width, initial-scale=1, user-scalable=no');

let head = document.head || document.documentElement;
let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
head.appendChild($myCss[0]);

$("body").attr("id", "IM-search");

let $searchBlock = $("#block-views-exp-search-page");
let $newSearch = $searchBlock.clone(false);
$(".views-submit-button, .views-reset-button", $newSearch).remove();
$("#views-exposed-form-search-page", $newSearch).on('submit', ()=>{
	return false;
}).click(()=>{
	window.location.hash = '#block-views-exp-search-page';
	$("#edit-query", $searchBlock).focus();
});
$newSearch.attr('id', 'new-search').prependTo( $("#content .container > .col-sm-9"));

chrome.runtime.sendMessage({turnedOn: true});