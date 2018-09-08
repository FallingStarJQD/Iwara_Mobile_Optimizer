let $body = $("body");
if( $body.hasClass('page-images') )
	ImageIndex();
else if( $body.hasClass('node-type-image') )
	Image();

function Image() {
	let $images = $(".node-image .field-name-field-images .field-items .field-item");  //页面内图片数量
	let head = document.head || document.documentElement;

	if($images.length > 1){
		let s = document.createElement('script');
		s.src = chrome.runtime.getURL('js/image_injected.js');
		head.appendChild(s);
	}

	let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
	head.appendChild($myCss[0]);

	$("body").attr("id", "IM-view");

	//右边栏图像外翻
	let $views = $('#block-views-images-block-4 .content .view-content, #block-views-search-block-1 .content .view-content');
	$(".views-row .views-column", $views).unwrap();

	chrome.runtime.sendMessage({turnedOn: true});	
}

function ImageIndex(){
	let head = document.head || document.documentElement;
	let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
	head.appendChild($myCss[0]);

	$("body").attr("id", "IM-index");

	$("#block-system-main .view-content .views-row .views-column").unwrap();
	$(".views-column a").attr('target', '_blank');

	chrome.runtime.sendMessage({turnedOn: true});
}