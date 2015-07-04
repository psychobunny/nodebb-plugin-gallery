var plugins = require.main.require('./src/plugins');
var async = require.main.require('async');
var winston = require.main.require('winston');
var fs = require('fs');

(function(module) {
	"use strict";

	var Gallery = {};
	Gallery.exposeAssetImages = function(app, cb) {
		var pluginPath = ''; // path of this plugin
		var publicImagePath = ''; // publicly accessible path to put images into
		var imageFiles = [
			'play-pause.svg',
			'loading.gif',
			'error.svg'
		];
		// filter gallery path from plugin paths list
		pluginPath = plugins.libraryPaths.filter(function(path) {
			return (path.indexOf('plugin-gallery/') > -1);
		})[0];
		// throw away filename, add folders
		pluginPath = pluginPath.slice(0, pluginPath.lastIndexOf('/') + 1) +
				'public/vendor/img/';
		// build path to public
		publicImagePath = pluginPath.slice(0, pluginPath.lastIndexOf('node_modules')) +
				'public/images/';
		async.each(imageFiles, function copyImage(filename, next) {
			var reader = fs.createReadStream(pluginPath + filename);
			reader.on('error', function(err) {
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
		}, function(err) {
			if (err) {
				winston.error('[plugins:gallery] Couldn\' move file: ' + filename);
				winston.error(err);
			}
			cb(null, app);
		});
	};

	module.exports = Gallery;
}(module));
