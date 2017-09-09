$(document).ready(function(){
	console.log('ready');

	initPreview();

	bindPreview();

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
