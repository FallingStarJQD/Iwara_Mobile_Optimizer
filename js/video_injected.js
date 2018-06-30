(function(){
	let $;
	let links = [];

	let observer = new MutationObserver((records)=>{
		main();
		observer.disconnect();
	});

	let DownloadOptions = document.getElementById('download-options');
	let as = DownloadOptions.getElementsByTagName('a'); //检测下载链接是否已设置，有则说明videojs已运行完毕
	if(as.length > 0)
		main();
	else
		observer.observe( DownloadOptions, {'childList':true, 'subtree':true});	

	function main(){
		$ = jQuery;
		let $downloadLinks = $("a", $downloadOptionList);
		$downloadLinks.each((index,element)=>{
			links[ $(element).text().trim()] = element.href;
		});

		//删除videojs
		let poster = $("video", $videoNode).attr('poster');
		/*if( links[localStorage.video_resolution] == null){
			//该视频没有localStorage中的分辨率时
			localStorage.video_resolution = 'Source';
		}*/
		let $newPlayer = $(`<video id="new-player" class="vjs-tech" preload="auto" poster="${poster}" src="${links[localStorage.video_resolution]}" controls="controls"></video>`);
		if(!videojs)
			alert('videojs unloaded!')
		videojs.getPlayers()['video-player'].dispose();
		$("#video-processing").after( $newPlayer);
		$newPlayer.on('loadedmetadata', (e)=>{
			let orientation = (e.target.videoWidth > e.target.videoHeight) ? 'landscape' : 'portrait';
			document.addEventListener('webkitfullscreenchange', (e)=>{
				screen.orientation.lock( orientation).catch(()=>{});
			});
		})

		//添加功能按钮
		let activelanguage = $("#block-locale-language .language-switcher-locale-session .language-link.session-active").attr('xml:lang'); //先侦测语言
		let btnText = [];
		if(activelanguage === 'zh-hans'){
			btnText[0] = '切换清晰度';
			btnText[1] = '用外部播放器打开';
		}
		else{
			btnText[0] = 'Switch resolution';
			btnText[1] = 'Open with an external player';
		}
		let $functionBtn = $(`
			<div id="IM-function">
				<div class="IM-switcher">
					<div class="IM-title">${btnText[0]}</div>
					<div class="IM-buttons"></div>
				</div>
				<div class="IM-external">
					<div class="IM-title">${btnText[1]}</div>
					<div class="IM-buttons"></div>
				</div>
			</div>
			`);
		let $switcherBtns = $(".IM-switcher .IM-buttons", $functionBtn);
		let $externalBtns = $(".IM-external .IM-buttons", $functionBtn);
		for( let key in links){
			$switcherBtns.append(`<button class="btn btn-primary">${key}</button>`);
			$externalBtns.append(`<a class="btn btn-primary" href="intent://${links[key].substr(7)}#Intent;action=android.intent.action.VIEW;scheme=http;type=video/mp4;S.title=${document.title};end">${key}</a>`);
		}		
		function setButtonsState( type) {
			$(".btn", $switcherBtns).each((index, button)=>{
				if(button.innerHTML == type)
					$(button).addClass('IM-current').attr('disabled', true);
				else
					$(button).remove('IM-current').attr('disabled', false);
			})
		}
		setButtonsState( localStorage.video_resolution);
		$(".btn", $switcherBtns).click((e)=>{
			let type = $(e.target).text();
			$newPlayer.attr('src', links[type]);
			setButtonsState( type);
			localStorage.video_resolution = type;
		});

		$newPlayer.after( $functionBtn);
	}
})()