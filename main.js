var mouseEnter //tracks where mouse is for pausing div
var divHeight; //updates when div has content loaded
var divWidth; //same
var intervalID; //interval that is checking for div changing size
var minDivHeight = 100;	
var maxDivHeight = 500; //set to default divHeight used for positioning


function addFields(fieldArray){
	var $newHTML = "";
	fieldArray.map(function(f) {$newHTML += f;});
	$("#tail").html($newHTML);
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
	$("div.clearfix").not("div.breadcrumbLayout").mouseenter(function() {showPreview(this);});
	$("div.clearfix").not("div.breadcrumbLayout").mouseleave(function() {hidePreview();});
}

function bindMouseDiv(divHeight, divWidth){
//bind div tail to mouse movement and div.clearfix to mouseenter/leave	
	console.log("bind");	

	var divLeft;
	var divTop;

	var wndwLeft = $(window).width();
	var wndwTop = $(window).height();

	if (divHeight < minDivHeight){//no content has loaded yet
		divHeight = maxDivHeight;
	}

	$(document).bind('mousemove', function(e){
		//adjust placement if mouse is near edge of window
		if ((e.pageX >= wndwLeft - divWidth) && (e.pageY - $(window).scrollTop() >= divHeight)) {
		   divLeft =  e.pageX - divWidth - 10;
		   divTop = e.pageY - divHeight - 10;
		} else if (e.pageY - $(window).scrollTop() >= divHeight) {
		   divLeft = e.pageX + 10;
		   divTop = e.pageY - divHeight - 10;
		} else if (e.pageX >= wndwLeft - divWidth) {
		   divLeft =  e.pageX - divWidth - 10;
		   divTop = e.pageY + 10;
		} else {
			divLeft = e.pageX + 10;
			divTop = e.pageY + 10;
		}

		$('#tail').css({
	   left:  divLeft,
	   top:   divTop
	    });
		
	});
}

function hidePreview(){
	console.log("mouse leave");
	$('#tail').toggleClass('transition');
	mouseEnter = false;
	window.clearInterval(intervalID);
	$('#tail').hide();
	$('#tail').html("<p>Loading...</p>");
};


function initPreview(divHght){
	//initialize newDiv preview window
	var $newDiv = $("<div id='tail'><p>Loading...<p></div>");
	$('body').append($newDiv);
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
	console.log("mouse enter");
	$('#tail').toggleClass('transition');
	mouseEnter = true; //track when cursor in div so that div can be paused
	$('#tail').fadeIn();
	addPreviewContent("http://www.kijiji.ca" + $(page).find("a").attr("href"));
	setIntervalX(function(){
		if (minDivHeight < $('#tail').outerHeight()){
			divHeight = $('#tail').outerHeight();
			divWidth = $('#tail').outerWidth();
			bindMouseDiv(divHeight, divWidth); 
		}
	}, 50, 20);


		

};

function unbindMouseDiv(){
	console.log("unbind");
	$(document).off('mousemove');
	$("div.clearfix").not("div.breadcrumbLayout").off('mouseenter');
	$("div.clearfix").not("div.breadcrumbLayout").off('mouseleave');
}

$(document).ready(function(){
	console.log('ready');
	//track times button pushed
	var shifted = 0


	initPreview();
	bindMouseDiv(divHeight, divWidth);
	bindHover();

	$(window).on('resize', bindMouseDiv(divHeight, divWidth));

	$(document).keydown(function(e) { 
		if (e.which == 16 && mouseEnter) {
			shifted += 1;
			console.log(shifted);
			if (shifted % 2 == 1){
				unbindMouseDiv();
			} else {
				bindMouseDiv(divHeight, divWidth);
				bindHover();
			}
		}
	});

});

