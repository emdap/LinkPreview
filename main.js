
function initPreview(divHght){
	//initialize newDiv preview window, and bind to mouse movement
	var $newDiv = $("<div id='tail'>Loading...</div>");
	$('body').append($newDiv);
	
	var divLft;
	var divTp;

	var lft = $(window).width();
	var tp = $(window).height();

	$(document).bind('mousemove', function(e){
		if ((e.pageX >= lft - 440) && (e.pageY - $(window).scrollTop() >= divHght)) {
		   divLft =  e.pageX - 460;
		   divTp = e.pageY - divHght;
		} else if (e.pageY - $(window).scrollTop() >= divHght) {
		   divLft = e.pageX + 20;
		   divTp = e.pageY - divHght;
		} else if (e.pageX >= lft - 440) {
		   divLft =  e.pageX - 460;
		   divTp = e.pageY - 10;
		} else {
			divLft = e.pageX + 20;
			divTp = e.pageY - 10;
		}

			$('#tail').css({
		   left:  divLft,
		   top:   divTp
		    });
		
	});
};

function showPreview(page){
		console.log("mouse enter");
    	//$(this).toggleClass("title_hov");
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
	//600 is estimate for height of div with content in it
	initPreview(400);
	test();

	$("div.info").mouseenter(function() {showPreview(this);});

	$("div.info").mouseleave(function() {hidePreview();});	
});

