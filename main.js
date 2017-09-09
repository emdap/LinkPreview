$(document).ready(function(){
	console.log('ready');

	initPreview();

	bindPreview();

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
		console.log('down');
		bindKeyDown(e);
	});

	$(document).keyup(function(e){
		console.log('up');
		bindKeyUp(e);
	});
	

});
