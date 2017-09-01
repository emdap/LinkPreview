function initPreview(){
	//initialize newDiv preview window, and bind to mouse movement
	var $newDiv = $("<div id='tail'>test</div>");
	$('body').append($newDiv);

	$(document).bind('mousemove', function(e){
	$('#tail').css({
	   left:  e.pageX + 20,
	   top:   e.pageY - 10
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
	initPreview();
	test();

	$("div.info").mouseenter(function() {showPreview(this);});

	$("div.info").mouseleave(function() {hidePreview();});	
});

