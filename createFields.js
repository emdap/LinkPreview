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
	
	var address = '<p> Location: ' + $(src).find('.address-3119942078').html() + '</p>';
	var map = '<p>' + $(src).find('.mapImage-1885488482').src() + '</p>';

	//can't get it to work with map
	console.log(map);

	finalVals = address + map + about + owner + since;

	addFields(finalVals);
};

function addFields(fieldStr){
	console.log('add fields');
	var $newHTML = $(fieldStr);
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
			//$newHTML.map($("#tail").append)

			//$("#tail").html($newHTML);
//			 $(data).find('.
//			var about = '<p>' + $(data).find('.header-4086619068').attr('data-reactid','290').html() + '</p>';
//			var owner = '<p>' + $(data).find('.profileItem-1908837923').html() + '</p>';
//			var since = '<p>' + $(data).find('.profileItem-1908837923').
//			var content = $(data).find('#R2SProfile').html();
			//console.log(about);
//			var $newDiv = $(about);
//			
//			var $newDiv = $(content);
	//		$("#tail").html($newDiv);
//			$("#tail").append($newDiv);
	//return $newDiv
			//console.log($newDiv);
		
			// console.log(content);
		}
	});
};