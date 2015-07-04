/* global blueimp */
'use strict';
$(document).ready(function() {
  var NBBGallery = function() {

    if (!this instanceof NBBGallery) {
      return new NBBGallery();
    }

    this.up = false;
    this.lastTop = 0;
    this.sel = '[component="post/content"] .img-markdown';  // image selector
    this._gallery = null;                                   // lightbox instance
    this.options = {                                        // lightbox options
      index: 0,
      clearSlides: true
    };                                                      // lightbox options;

    this.insertGalleryElements();
    var self = this;
    document.addEventListener('scroll', function() {
      self.up = (window.pageYOffset < self.lastTop);
      self.lastTop = window.pageYOffset;
    });
    $(window).on('action:topic.loaded', function() {
      var imgs = document.querySelectorAll(self.sel);
      if (imgs.length > 0) {
        self._gallery = null;
        self.addSlides(imgs, false);
      }
    });
    $(window).on('action:posts.loaded', function(evt, posts) {
      var imgs = document.querySelectorAll(self.sel +
                                           ':not([data-gallery-idx])');
      if (imgs.length > 0) {
        self.addSlides(imgs, self.up);
      }
    });
  };
  NBBGallery.prototype.reindexSlideElements = function() {
    var imgs = document.querySelectorAll(this.sel);
    for (var i = 0; i <= imgs.length - 1; i++) {
      imgs.item(i).dataset.galleryIdx = i;
    }
  };
  NBBGallery.prototype.Slide = function(src) {
    return {
      href: src,
      thumbnail: src
    };
  };
  NBBGallery.prototype.addSlides = function(imgs, up) {
    var img;
    var self = this;
    var slides = [];
    for (var i = 0; i <= imgs.length - 1; i++) {
      img = imgs.item(i);
      slides.push(this.Slide(img.src));
      img.addEventListener('click', function(evt) {
        var idx = parseInt(this.dataset.galleryIdx, 10);
        evt.preventDefault();
        self._gallery.initialize();
        self._gallery.slide(idx, 0);
      });
    }
    if (self._gallery) {
      try {
        self._gallery.add(slides);
      } catch (e) {
        // for some reason the internal slides array can't be 'pushed'
        // from time to time - just don't know which ones, yet.
        console.warn('[plugin:gallery] Non critical error in addSlides()');
      }
    } else {
      self._gallery = blueimp.Gallery(slides, self.options, true);
    }
    this.reindexSlideElements();
  };
  NBBGallery.prototype.insertGalleryElements = function() {
    // replace with templates.js ?
    var basicGallery = '<div id="blueimp-gallery" class="blueimp-gallery' +
                          ' blueimp-gallery-controls">' +
                          '<div class="slides"></div>' +
                          '<h3 class="title"></h3>' +
                          '<a class="prev">‹</a>' +
                          '<a class="next">›</a>' +
                          '<a class="close">×</a>' +
                          '<a class="play-pause"></a>' +
                          '<ol class="indicator"></ol>' +
                        '</div>';
    document.body.insertAdjacentHTML('beforeend', basicGallery);
  };
  window.NBBGallery = new NBBGallery();
});
