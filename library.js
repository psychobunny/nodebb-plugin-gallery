(function(module) {
	"use strict";

	var Gallery = {}

	Gallery.addScripts = function(scripts, callback) {
		return scripts.concat([
				'plugins/nodebb-plugin-gallery/vendor/jquery.mousewheel.min.js',
				'plugins/nodebb-plugin-gallery/vendor/fancybox/jquery.fancybox.js',
				'plugins/nodebb-plugin-gallery/vendor/fancybox/helpers/jquery.fancybox-buttons.js',
				'plugins/nodebb-plugin-gallery/vendor/fancybox/helpers/jquery.fancybox-media.js',
				'plugins/nodebb-plugin-gallery/vendor/fancybox/helpers/jquery.fancybox-thumbs.js',
				'plugins/nodebb-plugin-gallery/lib/main.js'
			]);
	};

	module.exports = Gallery;
}(module));
