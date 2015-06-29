var plugins = require.main.require('./src/plugins');
var async = require.main.require('async');
var winston = require.main.require('winston');
var fs = require('fs');

(function(module) {
	"use strict";

	var Gallery = {};
	Gallery.exposeImages = function(app, cb) {
		var pluginPath = ''; // path of this plugin
		var publicImagePath = ''; // publicly accessible path to put images into
		var imageFiles = [
			'blank.gif',
			'fancybox_loading.gif',
			'fancybox_loading@2x.gif',
			'fancybox_overlay.png',
			'fancybox_sprite.png',
			'fancybox_sprite@2x.png',
			'helpers/fancybox_buttons.png'
		];
		// filter gallery path from plugin paths list
		pluginPath = plugins.libraryPaths.filter(function(path) {
			return (path.indexOf('plugin-gallery/') > -1);
		})[0];
		// throw away filename, add folders
		pluginPath = pluginPath.slice(0, pluginPath.lastIndexOf('/') + 1) +
				'public/vendor/fancybox/';
		// build path to public
		publicImagePath = pluginPath.slice(0, pluginPath.lastIndexOf('node_modules')) +
				'public/images/';
		async.each(imageFiles, function copyImage(filename, next) {
			var reader = fs.createReadStream(pluginPath + filename);
			reader.on('error', function(err) {
				winston.error('[plugins:gallery] Couldn\' read file: ' + filename);
				winston.error(err);
				next(err);
			});
			var writer = fs.createWriteStream(publicImagePath + filename);
			writer.on('error', function(err) {
				next(err);
			});
			writer.on('close', function() {
				next();
			});
			reader.pipe(writer);
		});
		cb();
	};

	module.exports = Gallery;
}(module));
