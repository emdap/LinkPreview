function hidePreview(){
	//hide the active preview
	$('.tail.active').hide();
	$('.tail.active').html('<p>Loading...</p>');
};


function showPreview(page){
	//show the active preview
	$('.tail.active').fadeIn();
	addPreviewContent('http://www.kijiji.ca' + $(page).find('a').attr('href'));
	return true; //state of preview
};
