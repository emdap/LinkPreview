var mouseEnter //tracks where mouse is for pausing div
var divHeight; //updates when div has content loaded
var divWidth; //same
var intervalID; //interval that is checking for div changing size
var shifted = false //if shift has been pressed in document

function addFields(fieldArray){
	var $newHTML = "";
	fieldArray.map(function(f) {$newHTML += f;});
	console.log($.active);
	if ($.active == 1){
		$('.tail.active').html($newHTML);
	}
};

function addPreviewContent(link){
	$.ajax({
		url: link,
		type: 'GET',
		success: function(data){
			addFields(createFields(data));
		}
	});
};

function bindHover(){

	$('div.clearfix').not('div.breadcrumbLayout').mouseenter(function() {showPreview(this);});
	$('div.clearfix').not('div.breadcrumbLayout').mouseleave(function() {hidePreview();});
}

function bindMouseDiv(divHeight, divWidth){
//bind div.tail.active to mouse movement and div.clearfix to mouseenter/leave	

	var divLeft;
	var divTop;

	var wndwLeft = $(window).width();
	var wndwTop = $(window).height();

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

function hidePreview(){
	console.log('mouse leave');
	mouseEnter = false;
	window.clearInterval(intervalID);
	$('.tail.active').hide();
	$('.tail.active').html('<p>Loading...</p>');

};


function initPreview(divHght){
	//initialize newDiv preview window
	console.log('init');
	var $newDiv = $('<div class="tail active"><p>Loading...<p></div>');
	$('body').append($newDiv);

	allDivBindings();

};

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

function showPreview(page){
	console.log('mouse enter');
	mouseEnter = true; //track when cursor in div so that div can be paused
	$('.tail.active').fadeIn();
	addPreviewContent('http://www.kijiji.ca' + $(page).find('a').attr('href'));
};

function unbindMouseDiv(){
	$('.tail.active').toggleClass('active');
	$(document).off('mousemove');
	//$('div.clearfix').not('div.breadcrumbLayout').off('mouseenter');
	//$('div.clearfix').not('div.breadcrumbLayout').off('mouseleave');
}

function allDivBindings(){

	bindMouseDiv(divHeight, divWidth);
	bindHover();

	$('.tail').toggleClass('transition', true);

	$('.tail').dblclick(function(){
		if ($('div.tail.active').length == 0){
			$(this).toggleClass('active', true);
			bindMouseDiv(divHeight, divWidth);
			bindHover();
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

function movePreview(curDiv, mouse1){
	mouse1.preventDefault();
	clickX = mouse1.pageX - $(curDiv).offset().left;
	clickY = mouse1.pageY - $(curDiv).offset().top;

	$(document).bind('mousemove', function(e) {
		$(curDiv).toggleClass('transition', false);
		$(curDiv).css({
			left: e.pageX - clickX,
			top: e.pageY - clickY
		});
	});
}

$(document).ready(function(){
	console.log('ready');
	//track times button pushed
	var clickX;
	var clickY;
	var curLeft;
	var curTop;


	initPreview();

	// $('.tail.active').bind('click', function(e){

	// });

	$(window).on('resize', bindMouseDiv(divHeight, divWidth));

	$(document).keydown(function(e) { 
		if (e.which == 16 && mouseEnter) {
			shifted = true;
			console.log(shifted);
			
				unbindMouseDiv();
		}
		 else if (e.which==78 && $('div.tail.active').length == 0){
			console.log('making new div');
			initPreview();
		}
	});

	$(document).keyup(function(e){
		if (e.which == 16){
			console.log(shifted);
			shifted = false;
		}
	});



	});
