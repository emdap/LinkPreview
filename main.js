$(document).ready(function(){

	console.log('ready');

	//create and bind the preview window to all relevant mouse/keyboard events
	bindPreview(initPreview());

	//bind scrolling and keyboard commands to window
	bindWindow();
	

});
