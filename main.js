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
}

function showPreview(page){
		console.log("mouse enter");
    	//$(this).toggleClass("title_hov");
		$('#tail').fadeIn();
    	addPreviewContent("http://www.kijiji.ca" + $(page).find("a").attr("href"));
}

function hidePreview(){
		console.log("mouse leave");
		$('#tail').html("<p>Loading...</p>");
		$('#tail').hide();
};



function addPreviewContent(link){
	$.ajax({
		url: link,
		type: 'GET',
		success: function(data){
//			 $(data).find('.
//			var about = '<p>' + $(data).find('.header-4086619068').attr('data-reactid','290').html() + '</p>';
//			var owner = '<p>' + $(data).find('.profileItem-1908837923').html() + '</p>';
//			var since = '<p>' + $(data).find('.profileItem-1908837923').
			var content = $(data).find('#R2SProfile').html();
			//console.log(about);
			//var $newDiv = $(about);
			
			var $newDiv = $(content);
			$("#tail").html($newDiv);
	//return $newDiv
			//console.log($newDiv);
		
			// console.log(content);
		}
	});
}


$(document).ready(function(){
	console.log("ready");
	initPreview();

	$("div.info").mouseenter(function() {showPreview(this);});

	$("div.info").mouseleave(function() {hidePreview();});	

});

