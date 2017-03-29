/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// implement scroll event
	Site.links = document.querySelectorAll('nav#main a:not(.account)');
	Site.offsets = new Array();
	Site.sections = document.querySelectorAll('section');
	Site.active_index = 0;

	Site.links[0].classList.add('active');

	//section features
	Site.section_features = document.querySelector('div#features');

	// section offsets
	for (var i=0, count=Site.sections.length; i < count; i++)
		Site.offsets.push(Site.sections[i].offsetTop);

	window.addEventListener('scroll', function(event){
		var position = window.scrollY;
		var section_index = 0;
		var offsets = Site.offsets;

		for (var i=0, count = offsets.length; i<count; i++) {
			if (offsets[i] >= position)
				break;
			section_index = i;
		}

		if (Site.active_index != section_index) {
			Site.links[Site.active_index].classList.remove('active');
			Site.sections[Site.active_index].classList.remove('active');
			Site.links[section_index].classList.add('active');
			Site.sections[section_index].classList.add('active');
			Site.active_index = section_index;
		}

		if (position >= Site.section_features.offsetTop -150 && position <= Site.sections[1].offsetTop) {
			Site.section_features.classList.add('active');
		} else {
			Site.section_features.classList.remove('active');
		}

	});
};


// connect document `load` event with handler function
$(Site.on_load);
