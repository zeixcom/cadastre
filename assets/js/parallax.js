/* ==========================================================

 ========================================================== */


$(document).ready(function() {
	
	var calcParallaxBackHeight = function() {
	    var containerHeight = $('.container-main').outerHeight(),
	    	headerHeight = 389,
	    	backHeight = containerHeight - headerHeight;
	    $('.container-back').css('height', backHeight + 'px' );
    };
    
    calcParallaxBackHeight();
    
    $(window).on('resize', function() {
	   calcParallaxBackHeight(); 
    });

    
});