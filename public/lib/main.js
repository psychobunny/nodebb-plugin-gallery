(function() {
	"use strict";

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function() {
			alert('test');
			$('[component="post/content"] .img-markdown').attr('rel', 'gallery').fancybox();
		});
	});
}());