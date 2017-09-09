function createFields(src, link){
	console.log("createFields");

	//link title to actual page so can be clicked later for paused windows
	var title = '<br/><strong><a href="' + link + '">' + $(src).find('h1.title-1093844370').html() + '</a></strong>'
	//var about = $(src).find('.header-4086619068').attr('data-reactid','290').html();
	
	// if (about.match(/.*About the Poster.*/)){
	// 	about = "";
	// } else {
	// 	about = '<h2><strong>' + about +'</strong></h2>';
	// }

	var owner = '<span style="float: left; padding-left: 10px;">Account Type: <strong>' + $(src).find('.profileItem-1908837923:first').html() + '</strong>';
	var since = '<p>' + $(src).find('.profileItem-1908837923:eq(1)').html() + '</p></span>';
	
	var address =  $(src).find('.address-3119942078').html()
	if (typeof address == 'undefined'){
		var location = '<h2 style="padding-left: 10px; padding-right: 10px;"> Location: N/A </h2>';
		map = '';
	} else {
		var mapAddress = (address.replace(/ /g, "+")).replace(/#/g,"");
		var map = '<p> <a href="https://www.google.com/maps/dir//' + mapAddress + '/"  target="_blank"> <img width="300" src="https://maps.googleapis.com/maps/api/staticmap?center=' + mapAddress + '&zoom=13&scale=1&size=300x200&maptype=roadmap&format=png&visual_refresh=true&markers=size:lrg%7Ccolor:0xff99ff%7Clabel:%7C' + mapAddress + '" id="prvwMap" alt=""></a></p>';
		var location = '<h2>' + address + '</h2>';
	}
	
	var otherAdsLink = $(src).find('.profileLink-4028019214:first').attr('href');
	var otherAds = '<span style="float: right; padding-right: 10px;"><strong><a href=' + otherAdsLink + '  target="_blank">Other Ads</a></strong>';
	
	var webLink =  $(src).find('.profileLink-4028019214:eq(1)').attr('href');
	
	if (typeof webLink === 'undefined'){
		var web = '</span>';
	} else {
		var web = '<p><strong><a href=' + webLink + '  target="_blank">Website</a></strong></p></span>';
	}

	//finalVals = location + map + about + owner + since;
	
	finalVals = [title, location, map, owner, since, otherAds, web];
	return finalVals;
};

