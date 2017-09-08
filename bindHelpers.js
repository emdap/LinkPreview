function hidePreview(){
	//hide the active preview
	$('.tail.active').hide();
	$('.tail.active').html('<p>Loading...</p>');
};


function showPreview(page){
	console.log('mouseenter');
	//show the active preview
	$('.tail.active').fadeIn();
	addPreviewContent('http://www.kijiji.ca' + $(page).find('a').attr('href'));
	return true; //state of preview
};

var mouseoverCount = 0;

function showPreviewCount(page){
	console.log(mouseoverCount);
	var $hoverElement = getHoverElement();
	if (mouseoverCount > 0){
		$hoverElement.off('mouseover');
		$hoverElement.mouseenter(function() {showPreview(this);});
		mouseoverCount = 0;
	} else {
		mouseoverCount += 1;
		showPreview(page);
	}
}

function unbindMouse(){
	$('.tail.active').toggleClass('active', false);
	var $hoverElement = getHoverElement();
	$(document).off('mousemove');
	$hoverElement.off('mouseenter');
	$hoverElement.off('mouseover');
	$hoverElement.off('mouseleave');
}

function movePreview(curDiv, mouse1){
	//move preview that is frozen and has been clicked/dragged
	mouse1.preventDefault();
	var clickX = mouse1.pageX - $(curDiv).offset().left;
	var clickY = mouse1.pageY - $(curDiv).offset().top;

	$(document).bind('mousemove', function(e) {
		$(curDiv).toggleClass('transition', false);
		$(curDiv).css({
			left: e.pageX - clickX,
			top: e.pageY - clickY
		});
	});
}	