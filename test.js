console.log("test");

// jQuery

var mouseX;
var mouseY;

$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});  

var $newDiv = $("<div id='tail'>test</div>");
$('body').append($newDiv);

$(document).bind('mousemove', function(e){
$('#tail').css({
   left:  e.pageX + 20,
   top:   e.pageY - 10
    });
});

$(document).ready(function(){
	$("div.info").mouseenter(
    function() {
    	//var text = $('#myDiv .myClass a')
    	//color red
    	$(this).toggleClass("title_hov");

    	//add the hover di

		$('#tail').css({'top':mouseY,'left':mouseX}).fadeIn('slow');

    	var info =  getUserInfo("http://www.kijiji.ca" + $(this).find("a").attr("href"));
        console.log("test2");
    } 
 );

	$("div.info").mouseleave(
	function() {
		console.log("out");
		$(this).toggleClass("title_hov");
		$('#tail').css({'top':mouseY,'left':mouseX}).fadeOut();
		// var element = document.getElementById("test");
		// element.parentNode.removeChild(element);
		// }
});
});

// function getUserInfo(link){
// 	console.log(link)
// 	var a = $.get(link, function(page){
//     return alert(page.responseText);
// 	});
// 	return a;
// }

function getUserInfo(link){
	$.ajax({
		url: link,
		type: 'GET',
		success: function(data){
//			 $(data).find('.
			var about = '<p>' + $(data).find('.header-4086619068').attr('data-reactid','290').html() + '</p>';
//			var owner = '<p>' + $(data).find('.profileItem-1908837923').html() + '</p>';
//			var since = '<p>' + $(data).find('.profileItem-1908837923').
			var content = $(data).find('#R2SProfile').html();
			console.log(about);
			//var $newDiv = $(about);
			
			var $newDiv = $(content);
			$("#tail").html($newDiv);
			console.log($newDiv);
		
			// console.log(content);
		}
	});
}