function createFields(src, link){
	//returns an HTML string list that will compose the preview window
	//src is the HTML of the next page
	//link is the URL of the next page

	//link title of preview window to actual page so can be clicked when paused
	var title = '<br/><strong><a href="' + link + '">' + $(src).find('h1.title-1093844370').html() + '</a></strong>'

	//get 'account type' 
	var tempAcc = $(src).find('.profileItem-1908837923:first').not('span');
		if (typeof tempAcc.html() == 'undefined'){
			//no account type given if not logged into kijiji
			var acc = '<span style="float: left; padding-left: 10px;"><strong>Log in to Kijiji for more info</strong>';
		} else {
			var acc = '<span style="float: left; padding-left: 10px;">Account Type: <strong>' + tempAcc.html() + '</strong>';
		}

	//get 'online since' 
	var tempSince = $(src).find('.profileItem-1908837923:eq(1)').html();
		if (typeof tempSince == 'undefined'){
			//blank
			var since = '<p></p></span>';
		} else {
			var since = '<p>' + $(src).find('.profileItem-1908837923:eq(1)').html() + '</p></span>';
		}
	
	//get address for ad
	var address =  $(src).find('.address-3119942078').html()
		if (typeof address == 'undefined'){
			//blank
			var location = '<h2 style="padding-left: 10px; padding-right: 10px;"> Location: N/A </h2>';
			map = '';
		} else {
			//manipulate address characters for google map url
			var mapAddress = (address.replace(/ /g, "+")).replace(/#/g,"");
			//get link for map image
			var map = '<p> <a href="https://www.google.com/maps/dir//' + mapAddress + '/"  target="_blank"> <img width="300" src="https://maps.googleapis.com/maps/api/staticmap?center=' + mapAddress + '&zoom=13&scale=1&size=300x200&maptype=roadmap&format=png&visual_refresh=true&markers=size:lrg%7Ccolor:0xff99ff%7Clabel:%7C' + mapAddress + '" id="prvwMap" alt=""></a></p>';
			var location = '<h2>' + address + '</h2>';
		}
	
	//get link to other ads by this poster
	var otherAdsLink = $(src).find('.profileLink-4028019214:first').attr('href');

	if (typeof otherAdsLink == 'undefined'){
		//blank
		var otherAds = '<span style="float: right; padding-right: 10px;">';
	} else {
		var otherAds = '<span style="float: right; padding-right: 10px;"><strong><a href=' + otherAdsLink + '  target="_blank">Other Ads</a></strong>';
	}
	

	//get poster's website
	var webLink =  $(src).find('.profileLink-4028019214:eq(1)').attr('href');
		
		if (typeof webLink == 'undefined'){
			//blank
			var web = '</span>';
		} else {
			var web = '<p><strong><a href=' + webLink + '  target="_blank">Website</a></strong></p></span>';
		}

	
	//array of HTML strings to return
	finalVals = [title, location, map, acc, since, otherAds, web];
	return finalVals;
};

