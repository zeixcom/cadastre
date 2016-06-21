/* ==========================================================

 ========================================================== */


$(document).ready(function() {
	
	var calcParallaxBackHeight = function() {
	    var containerHeight = $('.container-main').outerHeight(),
	    	headerHeight = 208,
	    	backHeight = 0.8 * containerHeight;
	    $('.parallax__layer--back').css('height', backHeight + 'px' );
    };
    
    calcParallaxBackHeight();
    
    $(window).on('resize', function() {
	   calcParallaxBackHeight(); 
    });

    
});