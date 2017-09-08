function addFields(fieldArray){
	//add the new content to preview 
	var $newHTML = "";
	fieldArray.map(function(f) {$newHTML += f;});
	if ($.active == 1){ //check if ajax requests still queued
		$('.tail.active').html($newHTML);
	}
};

function addPreviewContent(link){
	//get webpage at link
	$.ajax({
		url: link,
		type: 'GET',
		success: function(data){
			addFields(createFields(data));
		}
	});
};

function initPreview(divHght){
	//initialize newDiv preview 
	var $preview = $('<div class="tail active"><p>Loading...<p></div>');
	$('body').append($preview);
};
