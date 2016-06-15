/* ==========================================================

 ========================================================== */


$(document).ready(function() {
	
	var calcParallaxBackHeight = function() {
	    var containerHeight = $('.container-fluid.parallax-layer').outerHeight(),
	    	headerHeight = 257,
	    	backHeight = containerHeight - headerHeight;
	    $('.container-back').css('height', backHeight + 'px' );
    };
    
    calcParallaxBackHeight();
    
    $(window).on('resize', function() {
	   calcParallaxBackHeight(); 
    });

    
});