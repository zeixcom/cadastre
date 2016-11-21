/* ==========================================================
 * modal.js
 *
 * Author: ZEIX AG, Esther Brunner
 * Date:   2016-11-21
 *
 * Copyright 2016 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

$(document).ready(function() {
  
  var MODAL_BODY_CLASS = 'modal-open';

  $('#blueimp-gallery')
    .on('open', function (event) {
        $('body').addClass(MODAL_BODY_CLASS);
    })
    .on('close', function (event) {
      $('body').removeClass(MODAL_BODY_CLASS);
    });
    
});