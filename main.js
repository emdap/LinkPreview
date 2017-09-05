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

function bindMouseDiv(divHght){
//bind div tail to mouse movement and div.clearfix to mouseenter/leave	
console.log("bind");
	$("div.clearfix").not("div.breadcrumbLayout").mouseenter(function() {showPreview(this);});
	$("div.clearfix").not("div.breadcrumbLayout").mouseleave(function() {hidePreview();});	

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
}

function hidePreview(){
		console.log("mouse leave");
		$('#tail').html("<p>Loading...</p>");
		$('#tail').hide();
};


function initPreview(divHght){
	//initialize newDiv preview window
	var $newDiv = $("<div id='tail'>Loading...</div>");
	$('body').append($newDiv);
};

function showPreview(page){
		console.log("mouse enter");
		$('#tail').fadeIn();
    	addPreviewContent("http://www.kijiji.ca" + $(page).find("a").attr("href"));
};

function unbindMouseDiv(){
	console.log("unbind");
	$(document).off('mousemove');
	$("div.clearfix").not("div.breadcrumbLayout").off('mouseenter');
	$("div.clearfix").not("div.breadcrumbLayout").off('mouseleave');
}

$(document).ready(function(){
	console.log("ready");
	//track times button pushed
	var shifted = 0
	//400 is estimate for height of div with content in it
	var divHght = 400;
	initPreview();
	bindMouseDiv(divHght);

	$(document).keydown(function(e) { 
		if (e.which == 16) {
			shifted += 1;
			console.log(shifted);
			if (shifted % 2 == 1){
				unbindMouseDiv();
			} else {
				bindMouseDiv(divHght);
			}
		}
	});

});

