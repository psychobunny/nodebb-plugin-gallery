/* global blueimp */
'use strict';
$(document).ready(function() {
  var NBBGallery = function() {

    if (!this instanceof NBBGallery) {
      return new NBBGallery();
    }

    this.sel = '[component="post/content"] .img-markdown';  // image selector
    this._gallery = null;                                   // lightbox instance
    this.options = {                                        // lightbox options
      index: 0,
      clearSlides: false
    };                                                      // lightbox options;

    this.setHooks();
    this.insertGalleryElements();
  };
  NBBGallery.prototype.setHooks = function() {
    var self = this;
    $(window).on('action:topic.loaded', function() {

      var imgs = document.querySelectorAll(self.sel);
      if (imgs.length > 0) {
        self.buildSlides(imgs, true);
      }
    });
  };
  NBBGallery.prototype.Slide = function(src) {
    return {
      href: src,
      thumbnail: src
    };
  };
  NBBGallery.prototype.buildSlides = function(imgs, clear) {
    console.log('buildSlides');
    var self = this;
    if (imgs.length > 0) {
      var slides = [imgs.length];
      console.log(imgs.length);
      for (var i = 0; i <= imgs.length - 1; i++) {
        var img = imgs.item(i);
        console.log('adding');
        slides[i] = self.Slide(imgs.item(i).src);
        img.dataset.galleryIdx = i;
        img.addEventListener('click', function(evt) {
          var idx = parseInt(this.dataset.galleryIdx, 10);
          console.log('my idx is: ' + this.dataset.galleryIdx);
          evt = evt || window.event;
          evt.preventDefault();
          self._gallery.initialize();
          self._gallery.slide(idx, 0);
        });
      }
      if (self._gallery) {
        if (!clear) {
          self._gallery.add(slides);
        } else {
          self._gallery.unloadAllSlides();
          self._gallery = blueimp.Gallery(slides, self.options);
        }
      } else {
        self._gallery = blueimp.Gallery(slides, self.options);
      }
    }
    // imgs.map(function(img, idx) {
    // });
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
