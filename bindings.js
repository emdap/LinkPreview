var shifted; //boolean for if shift is pressed

function unbindMouse(){
	$('.tail.active').toggleClass('active', false);
	$(document).off('mousemove');
	$('div.clearfix').not('div.breadcrumbLayout').off('mouseenter');
	$('div.clearfix').not('div.breadcrumbLayout').off('mouseleave');
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

function bindPreview(){
	bindMouse();

	$('.tail').toggleClass('transition', true);

	$('.tail').dblclick(function(){
		if ($('div.tail.active').length == 0){
			$(this).toggleClass('active', true);
			$(this).toggleClass('transition', true);
			bindMouse();
		}
	});
		
	$('.tail').mousedown(function(ev) {
		movePreview(this, ev);
	});

	$('.tail').mouseup(function(){
		$(document).off('mousemove');
		$(this).toggleClass('active', false);
	});

	$('.tail').click(function() {
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
	} else if (e.which==78 && $('div.tail.active').length == 0){
		initPreview();
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

	$('div.clearfix').not('div.breadcrumbLayout').mouseenter(function() {showPreview(this);});
	$('div.clearfix').not('div.breadcrumbLayout').mouseleave(function() {hidePreview();});

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
