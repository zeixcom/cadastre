/* ==========================================================
 * autocomplete.js
 * Deal with the Typeahead.js/Bloodhound library to build the search field autocomplete
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-01 14:23:18
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($, data) {
  var $searchFields = $('.form-search .search-field');
  if (data) {
    // Init the Bloodhound suggestion engine
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(data, function(state) { return { value: state }; })
    });
    bloodhound.initialize();

    // Init Typeahead on search-fields
    $searchFields.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: 'search',
      displayKey: 'value',
      source: bloodhound.ttAdapter()
    });
  }

  // Insert the icons
  $searchFields.after('<span class="icon icon--close" data-form-search-clear></span>');
  $('.form-search').append('<button class="icon icon--search icon--before"></button>');

  $('body').on('click', '[data-form-search-clear]', function () {
    $('#search-field').val('').focus(); // clear search field and refocus it
  });

}) (jQuery, (typeof searchData === 'undefined' ? false : searchData));

/* ==========================================================
 * carousel.js
 * Carousel helper
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-15 13:55:53
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(window).load(function () {
    carouselInit(jQuery);
  });

  $(window).resize(function () {
    carouselInit(jQuery);
  });

  // slideshow counter
  var slideshow_total = $('.carousel-slideshow .item').length;
  $('#carousel-total').text(slideshow_total);

  $('.carousel-slideshow').on('slid.bs.carousel', function () {

    var carouselData = $(this).data('bs.carousel');
    var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
    var total = carouselData.$items.length;

    var text = (currentIndex + 1);

    $('#carousel-index').text(text);
    $('#carousel-total').text(total);
  });

}) (jQuery);

function carouselInit ($) {
  var $carousel = $('.carousel:not(.carousel-slideshow)');

  $('.carousel .item:first-child').addClass('first');
  $('.carousel .item:last-child').addClass('last');

  $('.carousel').each(function() {
    disableControl($(this));
  });
  $('.carousel').on('slid.bs.carousel', function () {
    disableControl($(this));
  });

  if($carousel) {
    $carousel.each(function () {
      var biggestHeight = 0,
          titleHeight = $(this).find('h3:first-child').height(),
          imgHeight = $(this).find('.carousel-img').height();

      $(this).find('.carousel-indicators').css('top', titleHeight + imgHeight + 40);
      $(this).find('.carousel-control').css('top', titleHeight + imgHeight + 50);

      $(this).find('.item').each(function () {
        if ($(this).height() >= biggestHeight) {
          biggestHeight = $(this).height();
        }
      });
       $(this).find('.item').height(biggestHeight);
    });
  }
}

function disableControl(element) {
  if (element.find('.first').hasClass('active')) {
    element.find('.left').addClass('disabled').attr('aria-disabled', 'true');
  } else {
    element.find('.left').removeClass('disabled').attr('aria-disabled', 'false');
  }
  if (element.find('.last').hasClass('active')) {
    element.find('.right').addClass('disabled').attr('aria-disabled', 'true');
  } else {
    element.find('.right').removeClass('disabled').attr('aria-disabled', 'false');
  }
}

/* ==========================================================
 * collapse.js
 * Add class when nav collapse is open
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-06
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  // Normal Collapse
  $('.collapse:not(tbody)').on('show.bs.collapse', function () {
    $(this)
      .prev()
      .addClass('active icon--root')
      .removeClass('icon--greater')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('.collapse:not(tbody)').on('hide.bs.collapse', function () {
    $(this)
      .prev()
      .removeClass('active icon--root')
      .addClass('icon--greater')
      .attr( {
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

  // Table Collapse

  $('tbody.collapse').on('show.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .addClass('active')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('tbody.collapse').on('hide.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .removeClass('active')
      .attr({
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

}) (jQuery);
/* ==========================================================
 * drilldown.js
 * Drilldown plugin scripts. For page-list-nav element
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-30 09:02:09
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

 (function($) {

  var options = {
    event: 'click', // * View note below
    selector: 'a',  // * View note below
    speed: 100,
    cssClass: {
      container: 'drilldown-container',
      root: 'nav-page-list',
      sub: 'drilldown-sub',
      back: 'drilldown-back'
    }
  };

  $('.drilldown').drilldown(options);

 }) (jQuery);
/* ==========================================================
 * global-nav.js
 * Global Navigation syripts
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-27 16:36:15
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

 (function($) {
	 
  // Handle scroll to position nav as fixed

  var top = 36;

  $(window).scroll(function (event) {

    var y = $(this).scrollTop();

    if (y >= top) {
      if (!$('.nav-mobile').hasClass('fixed')) {
        $('.nav-mobile').addClass('fixed')
          .after('<div class="nav-mobile-spacer" id="spacer" style="height:36px;"></div>');
      }
    }
    else {
      if ($('.nav-mobile').hasClass('fixed')) {
        $('.nav-mobile').removeClass('fixed');
        $('#spacer').remove();
      }
    }
    
    if ($(window).width() <= 767) {
	    if (y >= top) {
	      if (!$('a.brand').hasClass('fixed')) {
	        $('a.brand').addClass('fixed');
	      }
	    }
	    else {
	      if ($('a.brand').hasClass('fixed')) {
	        $('a.brand').removeClass('fixed');
	      }
	    }
	}
	


  });
 }) (jQuery);
/* ==========================================================
 * carousel.js
 * Carousel helper
 *
 * Author: 
 * Date:   
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */




/*
$(document).ready(function(){

// 	$(window).on('resize', function() {
		if ($(window).width() <= 767){	
			$('.col-sm-4').insertAfter('.col-sm-8');
			else {
			$('.col-sm-8').insertAfter('.col-sm-4');	
			}
		}	
// 	});
    
});
*/
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */


/*
;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));
*/


/* ==========================================================
 * print.js
 * Add print preview windows
 *
 * Author: Yann, yann@antistatique.net
 * Date: 2015-02-02
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

 (function($) {

  // Initialization
  $.fn.printPreview = function() {
    return this;
  };

  $.printPreview = {

    printPreview: function(element) {
      var $body = $('body'),
          $container = $('.container-main'),
          footnoteLinks = "",
          linksIndex = 0;

      $body.find('.nav-mobile, .drilldown, .nav-main, .header-separator, .nav-service, .nav-lang, .form-search, .yamm--select, header > div:first-child, footer, .alert, .icon--print, .social-sharing, form, .nav-process, .carousel-indicators, .carousel-control, .breadcrumb, .pagination-container').remove();

      // if an element is passed, we want it to be the only thing to print out
      if (element) {
        element = $('[data-print=' + element + ']').clone(); // clone to fix issue with IE render
        var header = $('header').clone(); // clone to fix issue with IE render
            title = element.attr('data-title') ? '<h1>' + element.attr('data-title') + '</h1>' : '';
        $container.addClass('print-element').html('').append(header, title, element);
      }

      $body.addClass('print-preview');

      $container.prepend('<div class="row" id="print-settings">'+
        '<div class="col-sm-12">'+
          '<nav class="pagination-container clearfix">'+
            '<span class="pull-left">'+
              '<input type="checkbox" id="footnote-links">&nbsp;&nbsp;'+
              '<label for="footnote-links">Links as footnotes</label>'+
            '</span>'+
            '<ul class="pull-right pagination">'+
              '<li>'+
                '<button id="print-button" title="print" class="btn"><span class="icon icon--print"></span></button>'+
                '&nbsp;&nbsp;'+
                '<button id="close-button" title="close" class="btn btn-secondary"><span class="icon icon--close"></span></button>'+
              '</li>'+
            '</ul>'+
          '</nav>'+
        '</div>'+
      '</div>');

      $('#print-button').click(function () {
        $.printPreview.printProcess();
      });

      $('#close-button').click(function () {
        $.printPreview.printClose();
      });


      $('a').not('.access-keys a').each(function () {
        var target = $(this).attr('href');
        target = String(target);

        if (target != "undefined" && target.indexOf("http") === 0) {
          linksIndex ++;
          footnoteLinks += '<li>'+target+'</li>';
          $('<sup class="link-ref">('+linksIndex+')</sup>').insertAfter(this);
        }
      });


      $('#footnote-links').change(function(){
        if (this.checked) {
          $container.append('<div id="footnote-links-wrapper" class="row footnote-links-wrapper">'+
            '<div class="col-sm-12">'+
            '<h3>Page Links</h3><hr>'+
            '<ol>'+
              footnoteLinks+
            '</ol>'+
            '</div>'+
          '</div>');
          $body.addClass('print-footnotes');
        } else {
          $('#footnote-links-wrapper').remove();
          $body.removeClass('print-footnotes');
        }
      });
    },

    printProcess: function() {
      window.print();
    },

    printClose: function() {
      window.location.reload();
    }

  };

 }) (jQuery);

/* ==========================================================
 * rich-menu.js
 * Add overlay when openning a rich yamm menu and define open/close events
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-04-30 11:48:48
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

(function($) {

  // Keep jQuery object in variables
  var $yamm = $('.yamm'),
      $yammClose = $('.yamm-close, .yamm-close-bottom'),
      $body = $('body'),
      $dropdown = $('.yamm .dropdown'),
      $dropdownToggle = $('.yamm .dropdown-toggle'),
      $dropdownMenu = $('.dropdown-menu');

  // Toggle dropdown and fix z-index errors
  $yamm.each(function () {
    var $that = $(this);
    $that.on('click', '.dropdown-toggle', function () {
      if (!$(this).parent().hasClass('open')){
        var dropdownHeight = $(window).height() - 49;
        $that.find('.drilldown-container').height( dropdownHeight );
      }
    });
  });

  $dropdownToggle.on('click', function() {
    $(this).parents($dropdown).trigger('get.hidden');
  });

  $dropdown.on({
      "shown.bs.dropdown": function() { this.closable = false; },
      "get.hidden":        function() { this.closable = true; }
  });

  $('.dropdown').on('show.bs.dropdown', function () {
    $dropdown.removeClass('open');
    $yamm.removeClass('nav-open');
    $(this).parent($yamm).addClass('nav-open');
  });

  $dropdown.on('hide.bs.dropdown', function () {
    // only remove the nav-open class if effectively closing dropdown
    if (this.closable) {
      $yamm.removeClass('nav-open');
    }
    return this.closable;
  });

  $(document).on('click', function(e) {
    // hide dropdown if dropdown is open and target is not in dropdown
    if ($('.dropdown.open').length > 0 && $(e.target).parents('.dropdown').length === 0) {
        $('.dropdown.open .dropdown-toggle').trigger('click');
    }
  });

  // Trigger close yamm menu
  $dropdown.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (e) {
      e.preventDefault();
      $that.find($dropdownToggle).trigger("click");
    });
  });

}) (jQuery);

/* ==========================================================
 * select.js
 * Scripts handling `select` elements
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-04-30 10:20:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function(){
    $('select').chosen({
      disable_search_threshold: 10
    });
  });

}) (jQuery);
/* ==========================================================
 * shame.js
 * DOM rewritting on mobile, issue #160
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-06-18 15:57:23
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function () {
    var id;
    var isCarouselified = false;
    var isCollapsified = false;
    carouselify();
    collapsify();

    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(resizeLauncher, 500);
    });

    function resizeLauncher() {
      carouselify();
      collapsify();
    }

    function carouselify() {
      var $tabFocus = $(".tab-focus"),
          focusIndex = 0;
      if($tabFocus && $(window).width() <= 767 && !isCarouselified ) {
        isCarouselified = true;
        $tabFocus.each(function () {
          var $that = $(this),
              itemIndex = -1;
          focusIndex += 1;
          $that.attr('id', 'tab-focus-'+focusIndex);
          $that.next(".nav-tabs").hide().removeClass('nav-tabs-focus').addClass('focus');
          $that.addClass('carousel slide').removeClass('tab-content tab-border');
          $that.wrapInner( "<div class='carousel-inner'></div>");
          $that.prepend( "<ol class=\"carousel-indicators\"></ol>" );

          $that.find('.tab-pane').each(function () {
            itemIndex += 1;
            $(this).removeClass('tab-pane in active').addClass('item');
            $that.find('.carousel-indicators').append("<li data-target=\"#tab-focus-"+focusIndex+"\" data-slide-to=\""+itemIndex+"\" class=\"\"></li>");
          });
          $that.find('.item:first').addClass('active');
          $that.find('.carousel-indicators li:first-child').addClass('active');

          $that.append( "<a class=\"left carousel-control icon icon--before icon--less\" href=\"#tab-focus-"+focusIndex+"\" data-slide=\"prev\"></a><a class=\"right carousel-control icon icon--before icon--greater\" href=\"#tab-focus-"+focusIndex+"\" data-slide=\"next\"></a>" );
        });
      } else if($tabFocus && $(window).width() > 767 && isCarouselified) {
        isCarouselified = false;
        $tabFocus.each(function () {
          var $that = $(this);
          focusIndex -= 1;
          $that.attr('id', '');
          $that.next(".focus").addClass('nav-tabs-focus').removeClass('focus').css('display', 'flex'); // we can't use .show() because it should be a flex wrapper
          $that.removeClass('carousel slide').addClass('tab-content tab-border');
          $that.find( "ol.carousel-indicators" ).remove();

          $that.find('.item').each(function () {
            $(this).addClass('tab-pane').removeClass('item');
            $(this).css('height', 'auto');
          });
          $that.find('.tab-pane:first-child').addClass('active in');

          if ( $that.find('.tab-pane').parent().hasClass( "carousel-inner" ) ) {
            $that.find('.tab-pane').unwrap();
          }

          $that.find('.carousel-control').remove();
        });
      }
    }

    function collapsify() {
      var $navTab = $(".nav-tabs:not(.focus)"),
          $collapsify = $(".collapsify"),
          linkIndex = 0;
      if($navTab && $(window).width() <= 767 && !isCollapsified ) {
        isCollapsified = true;
        $navTab.not('.tab-focus').each(function (){
          var $that = $(this);
          $that.removeClass("nav-tabs").addClass('collapsify');
          $that.next('.tab-content').hide();
          $that.find('a').each(function (){
            var $target = $(this).attr('href');
            linkIndex += 1;
            $(this).unwrap();
            $( '<div class="collapse" id="collapse-'+linkIndex+'">'+$($target).html()+'</div>' ).insertAfter(this);
            $(this).attr('data-toggle', 'collapse');
            $(this).attr('data-target', '#collapse-'+linkIndex );
            $(this).addClass('collapse-closed');
            $(this).click(function(){
                $(this).toggleClass('collapse-closed');
            });
          });
          //$that.find('a:first-child').removeClass('collapse-closed').next('.collapse').addClass('in');
        });
      } else if($collapsify && $(window).width() > 767 && isCollapsified) {
        isCollapsified = false;
        $collapsify.each(function (){
          var $that = $(this);
          $that.addClass("nav-tabs").removeClass('collapsify');
          $that.next('.tab-content').show();
          $that.find('a').each(function (){
            var $target = $(this).attr('href');
            linkIndex -= 1;
            $(this).wrap('<li></li>');
            $(this).parent().next('.collapse').remove();
            $(this).attr('data-toggle', 'tab');
            $(this).attr('data-target', '');
            $(this).removeClass('collapse-closed');
          });
          $that.find('li a').each(function () {
            var $tabTarget = $(this).attr('href');
            if($($tabTarget).hasClass('active')){
              $(this).parent().addClass('active');
            }
          });
        });
      }
    }
  });

}) (jQuery);
/* ==========================================================
 * social.js
 * Social Sharing Privacy
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-19 16:47:40
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

 /*doc
 ---
 title: Social Sharing
 name: b-social-sharing
 category: Content Modules - Functions
 ---

 <span class="label label-admin">FIX</span>

 With the social sharing function, contents can be shared on social networks. In order to protect the privacy of the users, the function contains an activation mechanism. The user first has to activate the service before being able to share contents via his or her social network.

 At the moment, Facebook, Twitter, and Google Plus are supported. Just add the correct [Open Graph](http://ogp.me/) meta tags to get the preview images and descriptions.

 <br>
 <div class="alert alert-warning">
   **2.1.1:**

   - added the `.social-sharing` class to the `#social-sharing` element
   **2.1.7**

   - <span class="label label-danger">DEPRECATED</span> The `<div class="social-sharing" id="social-sharing"></div>` is now deprecated. Please update with the new way to display social links.
 </div>

 ```html_example
 <div class="social-sharing">
   <a href="#" aria-label="Facebook"
     onclick="
       window.open(
         'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
         'facebook-share-dialog',
         'width=626,height=436');
       return false;">
      <img src="img/FB-f-Logo__blue_29.png" width="16px" height="16px" alt="Share on Facebook">
   </a>
   <a href="#" aria-label="Twitter"
     onclick="
       window.open(
         'http://twitter.com/share?text=You text here.&url='+encodeURIComponent(location.href),
         'facebook-share-dialog',
         'width=626,height=436');
       return false;">
     <img src="img/Twitter_logo_blue.png" width="16px" height="16px" alt="Share on Twitter">
   </a>
   <a href="#"
      onclick="
        window.open(
          'https://plus.google.com/share?url=encodeURIComponent(location.href)',
          '',
          'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;">
      <img src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/></a>
 </div>
 ```
 */

 // DEPRECATED, to remove in 3.0.0
 $(function() {

   var setme = {
     facebook : {
       'dummy_alt'         : 'Facebook "Like"-Dummy',
       'txt_info'          : 'Two clicks for more privacy: The Facebook Like button will be enabled once you click here. Activating the button already sends data to Facebook.',
       'txt_off'           : 'not connected to Facebook',
       'txt_on'            : 'connected to Facebook'
     },
     twitter : {
       'txt_info'          : 'Two clicks for more privacy: The Tweet this button will be enabled once you click here. Activating the button already sends data to Twitter.',
       'txt_off'           : 'not connected to Twitter',
       'txt_on'            : 'connected to Twitter'
     },
     gplus : {
       'txt_info'          : 'Two clicks for more privacy: The Google+ button will be enabled once you click here. Activating the button already sends data to Google.',
       'txt_off'           : 'not connected to Google+',
       'txt_on'            : 'connected to Google+'
     }
   };

  if($('#social-sharing').length > 0){
    $('#social-sharing').socialSharePrivacy({
      css_path: '',
      services: setme
    });
  }

});

/* ==========================================================
 * subnavigation.js
 * Sub-navigation scripts, handles mainly how the nav-page-list behaves on small
 * screens
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-09-24 10:18:19
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  subNavInit(jQuery);
  $(window).resize(function () {
    subNavInit(jQuery);
  });

  $('a[href=#collapseSubNav]').on('click', function(e) {
    $(this).attr('aria-expanded', ($(this).attr('aria-expanded') === 'true' ? 'false' : 'true') );
  });

}) (jQuery);

function subNavInit($) {
  $drilldown = $('.drilldown[class*=col-]');
  if ($(window).width() <= 767 && !$drilldown.hasClass('collapse-enabled')) {
    $drilldown
      .addClass('collapse-enabled')
      .find('.drilldown-container')
      .addClass('collapse')
      .attr('id', 'collapseSubNav');
  } else if ($(window).width() > 767 && $drilldown.hasClass('collapse-enabled')) {
    $drilldown
      .removeClass('collapse-enabled')
      .find('.drilldown-container')
      .removeClass('collapse in')
      .attr('id', '')
      .css({
        'height': 'auto'
      });
  }
}
/* ==========================================================
 * tablesorter.js
 * Control tablesort from markup
 *
 * Author: Simon Perdrisat, simon@antistatique.net
 * Date:   2014-05-01 11:11:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */


(function($) {

  $('.table-sort').tablesorter();

}) (jQuery);
 /* ==========================================================
  * tabs.js
  * JS for the tabs and tab-focus elements
  *
  * Author: Toni Fisler, toni@antistatique.net
  * Date:   2014-09-09 09:58:14
  *
  * Copyright 2014 Federal Chancellery of Switzerland
  * Licensed under MIT
  ========================================================== */

(function($) {

  // Autoplay for tabs-focus elements
  var interval = 3000;
  var tabCarousel = setInterval(nextSlide, interval);

  $(document).on({
    mouseenter: function () {
      clearInterval(tabCarousel);
    },
    mouseleave: function () {
      tabCarousel = setInterval( nextSlide, interval);
    }
  }, ".tab-content.tab-focus, .nav-tabs.nav-tabs-focus");

  function nextSlide() {
    if ($('.nav-tabs-focus.nav-tabs > li').length) {
      var tabs = $('.nav-tabs-focus.nav-tabs > li'),
          active = tabs.filter('.active'),
          next = active.next('li'),
          toClick = next.length ? next.find('a') : tabs.eq(0).find('a');

      toClick.tab('show');
    }
  }

}) (jQuery);
/* ==========================================================
 * treecrumb.js
 * Change icon class to change the caret direction
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-05-01 11:11:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  var $treecrumb = $('.treecrumb'),
      $dropdownToggle = $('.dropdown-toggle');

  $treecrumb.each(function () {
    var $that = $(this);
    $that.on('hide.bs.dropdown', function(e) {
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
    });
    $that.on('show.bs.dropdown', function(e) {
      var target = e.relatedTarget;
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
      $(target).find('span').removeClass('icon--right');
      $(target).find('span').addClass('icon--bottom');
    });
  });

}) (jQuery);