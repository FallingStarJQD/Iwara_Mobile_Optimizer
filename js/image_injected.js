(function(){
	let $;

	let observer = new MutationObserver((records)=>{
		main();
		observer.disconnect();
	});

	let FieldItems = document.querySelector('.node-image .field-name-field-images .field-items');
	let SlickTrack = FieldItems.getElementsByClassName('slick-track');
	if(SlickTrack.length > 0) //检测slick是否已生成
		main();
	else{
		observer.observe( FieldItems, {'childList':true, 'subtree':true});
	}

	function main(){
		$ = jQuery;

		let itemsWidth = 0;

		//获取幻灯片容器宽度并赋值给内部元素
		function resetItemsWidth() {
			itemsWidth = $imageNodeFieldItems.width();
			$(".field-item", $imageNodeFieldItems).width( itemsWidth);
		}

		resetItemsWidth();
		// $imageNodeFieldItems.slick('refresh');
		$imageNodeFieldItems.slick('slickGoTo', 0, true);

		$(window).resize((e)=>{
			if($imageNodeFieldItems.width() !== itemsWidth)
				resetItemsWidth();
		});
	}
})()