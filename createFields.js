function createFields(src){
	console.log("createFields");

	var about = $(src).find('.header-4086619068').attr('data-reactid','290').html() + '</p>';
	
	if (about.match(/.*About the Poster.*/)){
		about = "";
	} else {
		about = '<p> Name: ' + about;
	}

	var owner = '<p> Account Type: ' + $(src).find('.profileItem-1908837923:first').html() + '</p>';
	var since = '<p>' + $(src).find('.profileItem-1908837923:eq(1)').html() + '</p>';
	var address =  $(src).find('.address-3119942078').html()
	var mapAddress = address.replace(/ /g, "+");
	var location = '<p> Location: ' + address + '</p>';
	var map = '<p> <img width="400" src="https://maps.googleapis.com/maps/api/staticmap?center=' + mapAddress + '&zoom=13&scale=1&size=400x200&maptype=roadmap&format=png&visual_refresh=true&markers=size:lrg%7Ccolor:0xff99ff%7Clabel:%7C' + mapAddress + '" alt=""> </p>';

	//finalVals = location + map + about + owner + since;
	finalVals = [location, map, about, owner, since];
	addFields(finalVals);
};

function addFields(fieldArray){
	console.log('add fields');
	var $newHTML = "";
	fieldArray.map(function(f) {$newHTML += f;});
	$("#tail").html($newHTML);
};

function test(){
	console.log(test);
};

function addPreviewContent(link){
	console.log("addPreview");
	$.ajax({
		url: link,
		type: 'GET',
		success: function(data){
			createFields(data);
		}
	});
};