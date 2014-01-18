(function() {
	"use strict";

	jQuery('document').ready(function() {
		var processPage = app.processPage;

		app.processPage = function() {
			processPage();

			$(".post-content a:has(img)").attr('rel', 'gallery').fancybox();
		}
	});
}());