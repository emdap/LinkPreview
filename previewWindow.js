function addFields(fieldArray){
	//fieldArray is array of HTML strings from createFields

	//HTML of preview window
	var $newHTML = "";
	
	//add all data from array
	fieldArray.map(function(f) {
		if (f!='undefined'){
			$newHTML += f;
		}
	});

	//update HTML of preview window
	$('.tail').not('.inactive').html($newHTML);
};

var curReq = null; //for tracking ajax requests

function addPreviewContent(link){
	//get webpage at link
	curReq = $.ajax({
		url: link,
		type: 'GET',
		beforeSend: function() {
			if (curReq != null){
				//to prevent queue of requests
				//if request already in progress, 
				//abort and reset curReq, 
				//then fulfill newest request
				curReq.abort();
				curReq = null;
			}
		},
		success: function(data){
			//generated preview window content on success
			//send data = HTML of page
			addFields(createFields(data, link));
			//initialize width to 300 while content loads

			//...this shouldn't be constant, different default 
			//width when created for different websites...
			$('.tail').not('.inactive').css({width: 300});	
		}
	});
};

function initPreview(divHght){
	//initialize newDiv preview 
	var $preview = $('<div class="tail active" style="width: 75px" tabindex="0" scrollTop="0"><p>Loading...<p></div>');
	//add to body
	$('body').append($preview);
	//hide it
	$('.tail.active').hide();
	return $('.tail.active');
};
