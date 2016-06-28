/* ==========================================================
 * parallax-scrolling.js
 *
 * Author: ZEIX AG, Esther Brunner, Henrik Hentschel
 * Date:   2016-06-28
 *
 * Copyright 2016 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */


$(document).ready(function() {

	
	var MOBILE_BREAKPOINT = 768;
		
	var _init = function() {
		$("body").prepend("<div class='parallax-bg'><div class='parallax-img'></div></div>");
		$(window).bind('scroll',function(e){
		    parallaxScroll();
		});
		
		function parallaxScroll(){
		    var scrolled = $(window).scrollTop();
		    $('.parallax-img').css('background-position', '0 ' + (0 - (scrolled * 0.25)) + 'px');
		}
	};

	
	if ($(window).width() >= MOBILE_BREAKPOINT) {
		_init();
		
	}
	
	$(window).on('resize', function() {
		
		if (($('.parallax-bg').length && $(window).width() < MOBILE_BREAKPOINT)) {
			$( ".parallax-bg" ).remove();
		} else if (!$('.parallax-bg').length && ($(window).width() >= MOBILE_BREAKPOINT)) {
			_init();
		}
		
	});
});