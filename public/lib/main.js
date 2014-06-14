(function() {
	"use strict";

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function() {
			$(".post-content a:has(img)").attr('rel', 'gallery').fancybox();
		});
	});
}());