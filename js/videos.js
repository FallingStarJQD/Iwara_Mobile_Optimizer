let $body = $("body");
if( $body.hasClass('page-videos') )
	VideoIndex();
else if( $body.hasClass('node-type-video') )
	Video();

function Video(){
	let $downloadOptions = $("#download-options");  //没有下载选项说明这是youtube页面
	let head = document.head || document.documentElement;

	if($downloadOptions.length > 0){
		let s = document.createElement('script');
		s.src = chrome.runtime.getURL('js/video_injected.js');
		head.appendChild(s);
	}

	let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
	head.appendChild($myCss[0]);

	if( $downloadOptions.length > 0){
		let observer = new MutationObserver((records)=>{
			let $submitted = $("#block-system-main .node-info .submitted");
			let title = $(".title", $submitted).text();
			let username = $(".username", $submitted).text();
			$('#download-options a').addClass('btn btn-primary').click((e)=>{
				let a = e.target
				chrome.runtime.sendMessage({
					url: a.href,
					filename: `${title} (${username}).mp4` //更改下载文件名
				});
				return false;
			});
			observer.disconnect();
		});
		observer.observe( $('#download-options')[0], {'childList':true, 'subtree':true});
	}

	$("body").attr("id", "IM-view");

	//右边栏图像外翻
	let $views = $('#block-views-videos-block-1 .content .view-content, #block-views-search-block-1 .content .view-content');
	$(".views-row .views-column", $views).unwrap();

	chrome.runtime.sendMessage({turnedOn: true});
}

function VideoIndex(){
	let head = document.head || document.documentElement;
	let $myCss = $(`<link id="myCss" type="text/css" rel="stylesheet" href="${chrome.runtime.getURL('iwara_mobile.css')}"></link>`);
	head.appendChild($myCss[0]);

	$("body").attr("id", "IM-index");

	$("#block-system-main .view-content .views-row .views-column").unwrap();
	$(".views-column a").attr('target', '_blank');

	chrome.runtime.sendMessage({turnedOn: true});
}