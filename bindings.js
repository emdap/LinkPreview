

//functions that create a bind 

function bindWindow(){
	//creates bind for scrolling, keydown

	//when scrolling window:
	//search for inactive (paused or fixed) preview windows
	//update their 'top' coordinate to maintain relative position
	$(document).scroll(function() {
		var scrollDiff;
		$('.tail').not('.active').each(function(){
			scrollDiff = $(window).scrollTop() + parseInt($(this).attr('scrollTop'),10);	
			$(this).toggleClass('fastTransition', true);
			$(this).css({
				top: scrollDiff
			});
		});
    });


	//when pressing key:
	//call function that determines how to manipulate preview
	$(document).keydown(function(e) {
		bindKeyDown(e);
	});

}
function bindPreview(curDiv){
	//curDiv is the active preview window
	//bind to mouse movements/clicks/keyboard

	//binding details for mouse movement
	bindMouse();

	//slower movement location changes
	$(curDiv).toggleClass('slowTransition', true);

	//remove preview window by double clicking
	$(curDiv).dblclick(function(){
		$(this).remove();
	});
		
	//binding for dragging a paused preview window
	$(curDiv).mousedown(function(ev) {
			//toggle keydown binding when dragging
			$(document).off('keydown');
			$(this).get(0).focus();
			//adjusts location to drag
			movePreview(this, ev);
	});

	//bind keydown presses ON preview window to function
	//for changing states of paused/fixed window
	$(curDiv).keydown(function(ev) {
		bindPreviewKeys(this, ev);
	});

	//dragging preview window finished
	$(curDiv).mouseup(function(e){
		//toggle keydown binding when dragging
		$(document).keydown(function(e) {
			bindKeyDown(e);
		});
		//turn off movePreview
		$(this).off('mousemove');
		$(this).get(0).blur();
	});
}

function bindPreviewKeys(curDiv, e){
	//change state of paused or fixed preview window
	//curDiv is the current preview window, e is the key pressed

	if (e.which == 16 && $('div.tail.active').length == 0){ //unpause window
		$(curDiv).toggleClass('active', true);
		$(curDiv).toggleClass('inactive', false);
		$(curDiv).toggleClass('fixed', false);
		$(curDiv).toggleClass('slowTransition', true);
		$(curDiv).toggleClass('fastTransition', false);
		
	} else if (e.which == 70){ //toggle fixed window

		$(curDiv).toggleClass('fixed');
		$(curDiv).toggleClass('inactive');
	}
}

function bindMouse(){
	//bind preview window to mouse movement 
	//bind hoverelement to mouse entering/leaving

	var divLeft;
	var divTop;
	var wndwLeft = $(window).width();

	//different depending on content script match
	var $hoverElement = getHoverElement();
	
	//show/hide preview on mouse enter/leave of hoverelement
	$hoverElement.mouseenter(function() {showPreview(this);});
	$hoverElement.mouseleave(function(e) {hidePreview(e);});



	$(document).bind('mousemove', function(e){
		//adjust placement if mouse is near edge of window
		divHeight = $('.tail.active').not('.fixed').outerHeight();
		divWidth = $('.tail.active').not('.fixed').outerWidth();
	
		//position around mouse, move to other side of mouse
		//if too close to edge of window
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

		//update coordinates of preview window
		$('.tail.active').not('.fixed').css({
		    left:  divLeft,
		    top:   divTop
	    });

	    
		if ($('div.tail.active').length > 0){ 
			//HTML function errors out if tail.active no longer exists
			//update scrollTop so can be ref'd later to 
			//maintain relative position on scrolling
			$('.tail.active').attr('scrollTop', $('.tail.active')[0].getBoundingClientRect().top);
		}
	});
}



//helper functions for above

function bindKeyDown(e){
	//keyboard bindings from document
	//new preview window, fix active window, pause active window, remove all static windows

	if (e.which == 16){ 
	//pause previewwindow when shift key pressed
		if ($('.tail.active').is(":visible")) {
			$('.tail.active').toggleClass('inactive', true);
			$('.tail.active.inactive').toggleClass('active', false);
		}
	} else if (e.which==78 && $('div.tail.active').length == 0){
		//new previewwindow when n pressed
		//only if no current active window
		bindPreview(initPreview());
	} else if (e.which==82){ 
		//get rid of all static preview windows on r
		$('.tail.inactive').remove();
		$('.tail.fixed').remove();
	} else if (e.which == 70){
		//make active preview window be fixed
		$('.tail.active').toggleClass('fixed', true);
		$('.tail.active.fixed').toggleClass('active', false);
	}
}

function hidePreview(e){
	//hide the active preview

	if (e.relatedTarget == 'null'){
		if (e.relatedTarget.className != "tail active slowTransition"){
			//only hide if not accidentally mousing through preview window itself
			$('.tail.active').not('.fixed').hide();
			$('.tail.active').html('<p>Loading...</p>');
			$('.tail.active').css({width: 75});
	}
}
};


function showPreview(page){
	//show the active preview
	$('.tail.active').not('.fixed').fadeIn();
	addPreviewContent($(page).find('a').attr('href'));
	return true; //state of preview
};


function movePreview(curDiv, mouse1){
	//move preview that is frozen and has been clicked/dragged
	//curDiv is active preview window, mouse1 is initial mouse event

	mouse1.preventDefault();
	var clickX = mouse1.pageX - $(curDiv).offset().left;
	var clickY = mouse1.pageY - $(curDiv).offset().top;

	$(curDiv).bind('mousemove', function(e) {
		//update coordinates as mouse moves
		$(curDiv).toggleClass('slowTransition', false);
		$(curDiv).toggleClass('fastTansition', false);
		$(curDiv).css({
			left: e.pageX - clickX,
			top: e.pageY - clickY
		});

		//update relative scroll position
		$(curDiv).attr('scrollTop', $(curDiv)[0].getBoundingClientRect().top);
	});
}	
