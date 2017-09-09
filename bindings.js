//functions that create a bind 

function bindWindow(){
	$(document).scroll(function() {
		var scrollDiff;
		$('.tail').not('.active').each(function(){
			scrollDiff = $(window).scrollTop() + parseInt($(this).attr('scrollTop'),10);	
			$(this).toggleClass('transition', true);
			$(this).css({
				top: scrollDiff
			});
		});
    });

	$(window).on('resize', bindPreview());

	$(document).keydown(function(e) {
		bindKeyDown(e);
	});

}
function bindPreview(){
	bindMouse();

	$('.tail.active').toggleClass('transition', true);

	$('.tail').dblclick(function(){
		$(this).remove();
	});
		
	$('.tail').mousedown(function(ev) {
		console.log('down');
		//if ($('div.tail.active').length == 0){
			movePreview(this, ev);
		//}
	});

	$('.tail').mouseup(function(){
		console.log('up');
		//if ($('div.tail.active').length == 0){
			$('.tail.inactive').off('mousemove');
			$('.tail.fixed').off('mousemove');
		//}
	});
}

function bindMouse(){
//bind div.tail.active to mouse movement and ('div.clearfix').not('div.breadcrumbLayout') to mouseenter/leave
	var divLeft;
	var divTop;
	var wndwLeft = $(window).width();

	var $hoverElement = getHoverElement();
	
	$hoverElement.mouseenter(function() {showPreview(this);});
	$hoverElement.mouseleave(function() {hidePreview();});

	//if mouse is already in div.clearfix when tail is created (happens on first creation), then mouseEnter does not fire
	//need to check if mouseOver, but this will keep firing for as long as mouse in range
	//so just want to use that once for the initial startup and then turn it off to prevent forever loading previewWindows
	


	$(document).bind('mousemove', function(e){
		//adjust placement if mouse is near edge of window

		divHeight = $('.tail.active').not('.fixed').outerHeight();
		divWidth = $('.tail.active').not('.fixed').outerWidth();

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

		$('.tail.active').not('.fixed').css({
		    left:  divLeft,
		    top:   divTop
	    });

	    
		if ($('div.tail.active').length > 0){ //HTML function errors out if tail.active no longer exists
			$('.tail.active').attr('scrollTop', $('.tail.active')[0].getBoundingClientRect().top);
		}
	});
}

//functions that are called by the bind
function bindKeyDown(e){
	if (e.which == 16){ //pause previewwindow when shift key pressed
		if ($('.tail.active').is(":visible")) {
			$('.tail.active').toggleClass('inactive', true);
			$('.tail.active.inactive').toggleClass('active', false);
		}
	} else if (e.which==78 && $('div.tail.active').length == 0){ //new previewwindow when n pressed
		if ($('div.tail.fixed').length > 0) {
			$('div.tail.fixed').remove();
		}
		initPreview();
		bindPreview();
	} else if (e.which==82){ //get rid of all static preview windows on r
		$('.tail.inactive').remove();
		$('.tail.fixed').remove();
	} else if (e.which == 70){
		$('.tail.active').toggleClass('fixed', true);
		$('.tail.active.fixed').toggleClass('active', false);
	}
}

function hidePreview(){
	//hide the active preview
	$('.tail.active').not('.fixed').hide();
	$('.tail.active').html('<p>Loading...</p>');
	$('.tail.active').css({width: 75});
};


function showPreview(page){
	//show the active preview
	$('.tail.active').not('.fixed').fadeIn();
	addPreviewContent('http://www.kijiji.ca' + $(page).find('a').attr('href'));
	return true; //state of preview
};

// var mouseoverCount = 0;

// function showPreviewCount(page){
// 	console.log('mouseover');
// 	var $hoverElement = getHoverElement();
// 	if (mouseoverCount > 0){
// 		console.log(mouseoverCount);
// 		$hoverElement.off('mouseover');
// 		$hoverElement.mouseenter(function() {showPreview(this);});
// 	} else {
// 		mouseoverCount += 1;
// 		showPreview(page);
// 	}
// }

function movePreview(curDiv, mouse1){
	//move preview that is frozen and has been clicked/dragged
	mouse1.preventDefault();
	var clickX = mouse1.pageX - $(curDiv).offset().left;
	var clickY = mouse1.pageY - $(curDiv).offset().top;

	$(curDiv).bind('mousemove', function(e) {
		$(curDiv).toggleClass('transition', false);
		$(curDiv).css({
			left: e.pageX - clickX,
			top: e.pageY - clickY
		});

		$(curDiv).attr('scrollTop', $(curDiv)[0].getBoundingClientRect().top);
	});
}	
