function addFields(fieldArray){
	//add the new content to preview 
	var $newHTML = "";
	fieldArray.map(function(f) {$newHTML += f;});
	$('.tail.active').html($newHTML);
};

var curReq = null; //for tracking ajax requests

function addPreviewContent(link){
	//get webpage at link
	curReq = $.ajax({
		url: link,
		type: 'GET',
		beforeSend: function() {
			if (curReq != null){
				curReq.abort();
				curReq = null;
			}
		},
		success: function(data){
			addFields(createFields(data));
		}
	});
};

function initPreview(divHght){
	//initialize newDiv preview 
	var $preview = $('<div class="tail active" scrollTop=0><p>Loading...<p></div>');
	$('body').append($preview);
	$('.tail.active').hide();
	
};
