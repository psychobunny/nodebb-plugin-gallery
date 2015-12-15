(function() {
	"use strict";

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function() {
			var img = $('[component="post/content"] .img-markdown');
			img.parent('a').addClass('fancybox').attr('rel', 'gallery').fancybox();
		});
	});
}());