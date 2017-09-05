
function initPreview(divHght){
	//initialize newDiv preview window
	var $newDiv = $("<div id='tail'>Loading...</div>");
	$('body').append($newDiv);
};

function bindMouseDiv(divHght){
//bind div tail to mouse movement
	var divLft;
	var divTp;

	var lft = $(window).width();
	var tp = $(window).height();

	$(document).bind('mousemove', function(e){
		//adjust placement if mouse is near edge of window
		if ((e.pageX >= lft - 440) && (e.pageY - $(window).scrollTop() >= divHght)) {
		   divLft =  e.pageX - 460;
		   divTp = e.pageY - divHght;
		} else if (e.pageY - $(window).scrollTop() >= divHght) {
		   divLft = e.pageX + 20;
		   divTp = e.pageY - divHght;
		} else if (e.pageX >= lft - 440) {
		   divLft =  e.pageX - 460;
		   divTp = e.pageY + 20;
		} else {
			divLft = e.pageX + 20;
			divTp = e.pageY + 20;
		}

		$('#tail').css({
	   left:  divLft,
	   top:   divTp
	    });
		
	});


	$("div.info").mouseenter(function() {showPreview(this);});

	$("div.info").mouseleave(function() {hidePreview();});	
}

function unbindMouseDiv(){
	console.log("unbind");
	// $(document).unbind('mousemove', function(e) {
	// 	var pos = $('#tail').position();

	// 	$('#tail').css({
	//    left:  100,
	//    top:   200
	//     });
	// });
	$(document).off('mousemove');
	$("div.info").off('mouseenter');
	$("div.info").off('mouseleave');
}

function showPreview(page){
		console.log("mouse enter");
		$('#tail').fadeIn();
    	addPreviewContent("http://www.kijiji.ca" + $(page).find("a").attr("href"));
};

function hidePreview(){
		console.log("mouse leave");
		$('#tail').html("<p>Loading...</p>");
		$('#tail').hide();
};


$(document).ready(function(){
	console.log("ready");
	//400 is estimate for height of div with content in it
	var divHght = 400;
	initPreview();
	bindMouseDiv(divHght);
	test();

	$(document).keydown(function(e) { 
		if (e.which == 90) {
			unbindMouseDiv();
		}});
	$(document).keyup(function(e) { 
	if (e.which == 90) {
		bindMouseDiv(divHght);
	}});
});

