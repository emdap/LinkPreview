$(document).ready(function(){
	console.log('ready');

	initPreview();

	//apply preview bindings
	bindPreview();

	$(window).on('resize', bindMouse());

	$(document).keydown(function(e) {
		console.log('down');
		bindKeyDown(e);
	});

	$(document).keyup(function(e){
		console.log('up');
		bindKeyUp(e);
	});
	

});
