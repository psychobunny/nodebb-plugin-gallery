(function() {
	"use strict";

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function() {
			$('[component="post/content"] .img-markdown').attr('rel', 'gallery').fancybox();
		});
	});
}());