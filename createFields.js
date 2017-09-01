function createFields(src){
	console.log("createFields");
	var about = '<p>' + $(src).find('.header-4086619068').attr('data-reactid','290').html() + '</p>';
	return about
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
			var $newHTML = $(createFields(data));
			$("#tail").html($newHTML);
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