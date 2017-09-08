var shifted; //boolean for if shift is pressed

function bindPreview(){
	bindMouse();

	$('.tail.active').toggleClass('transition', true);

	$('.tail.active').dblclick(function(){
		if ($('div.tail.active').length == 0){
			$(this).toggleClass('active', true);
			$(this).toggleClass('transition', true);
			bindPreview();
		}
	});
		
	$('.tail.active').mousedown(function(ev) {
		movePreview(this, ev);
	});

	$('.tail.active').mouseup(function(){
		$(document).off('mousemove');
		$(this).toggleClass('active', false);
	});

	$('.tail.active').click(function() {
		if(shifted == true){
			$(this).remove();
		}
	})
}

function bindKeyDown(e){
	if (e.which == 16){
		shifted = true;
		if ($('.tail.active').is(":visible")) {
			unbindMouse();
		}
	} else if (e.which==78 && $('div.tail.active').length == 0){ //n has been pressed
		initPreview();
		bindPreview();
	}
}

function bindKeyUp(e){
	if (e.which == 16){
		shifted = false;
	}
}

function bindMouse(){
//bind div.tail.active to mouse movement and ('div.clearfix').not('div.breadcrumbLayout') to mouseenter/leave
	var divLeft;
	var divTop;
	var wndwLeft = $(window).width();

	var $hoverElement = getHoverElement();
	
	$hoverElement.mouseover(function() {showPreviewCount(this);});
	$hoverElement.not('div.breadcrumbLayout').mouseleave(function() {hidePreview();});

	//if mouse is already in div.clearfix when tail is created (happens on first creation), then mouseEnter does not fire
	//need to check if mouseOver, but this will keep firing for as long as mouse in range
	//so just want to use that once for the initial startup and then turn it off to prevent forever loading previewWindows
	


	$(document).bind('mousemove', function(e){
		//adjust placement if mouse is near edge of window

		divHeight = $('.tail.active').outerHeight();
		divWidth = $('.tail.active').outerWidth();

		if ((e.pageX >= wndwLeft - divWidth) && (e.pageY - $(window).scrollTop() >= divHeight)) {
		   divLeft =  e.pageX - divWidth - 20;
		   divTop = e.pageY - divHeight - 20;
		} else if (e.pageY - $(window).scrollTop() >= divHeight) {
		   divLeft = e.pageX + 20;
		   divTop = e.pageY - divHeight - 20;
		} else if (e.pageX >= wndwLeft - divWidth) {
		   divLeft =  e.pageX - divWidth - 20;
		   divTop = e.pageY + 20;
		} else {
			divLeft = e.pageX + 20;
			divTop = e.pageY + 20;
		}

		$('.tail.active').css({
	   left:  divLeft,
	   top:   divTop
	    });
		
	});
}
