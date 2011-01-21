/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: jQuery plugin used for Twitter accounts feed application. Made
             for demonstration purposes only. Responsible for adding slide
             effect to the feeds.
*/

(function($){

  // Plugin methods are encapsulated in methods object
  var methods = {
    // initial method called during plugin initialization
    init : function (options) {
      // caching of jQuery objects
      var panels, panelsItems, panelsHolder, nextPanelButton;

      var settings = {
        queue    : false,
        duration : 300,
      };
      
      if ( options ) { 
        $.extend( settings, options );
      }
      
      return this.each(function(){
        panels = $(this);
        panelsItems = panels.find('.panel');
        panelsItems.wrapAll('<div class="panels-holder">');
        panelsHolder = panels.find('.panels-holder');
        panels.prepend('<a href="#" class="next-panel-button">Next &raquo;</a>');
        nextPanelButton = panels.find('.next-panel-button');
        nextPanelButton.bind('click.slidingPanels',{
          panels: panels, panelsHolder: panelsHolder, settings: settings,
          nextPanelButton: nextPanelButton
        }, methods.right);
      });
    },

    // destroying plugin
    destroy : function () {
      return this.each(function (){
        $(this).empty();
      });
    },

    // moving viewing port to the right by moving content to the left
    right : function (event) {
      var parent = event.data
      var panelWidth = parent.panels.find('.panel').outerWidth();
      var leftIndent = parseInt(parent.panelsHolder.css('left')) - panelWidth;
      parent.panelsHolder.animate({'left' : leftIndent},{
        queue:parent.settings.queue,
        duration: parent.settings.duration,
        complete: function() {      
          parent.panelsHolder.find('.panel:last').after(parent.panelsHolder.find('.panel:first'));
          parent.panelsHolder.css({'left' : '0px'});
          var panelHeight = parent.panelsHolder.find('.panel:first').outerHeight();
          var buttonHeight = parent.nextPanelButton.outerHeight();
          buttonHeight += parseInt(parent.nextPanelButton.css('margin-top'));
          buttonHeight += parseInt(parent.nextPanelButton.css('margin-bottom'));
          parent.panelsHolder.css({'height' : panelHeight+'px'});
          parent.panels.animate({'height': panelHeight+buttonHeight},
            {queue:parent.settings.queue, duration:Math.round(parent.settings.duration/2)});
        }
      });
      return false;
    }
  };

  // extending jQuery as plugin function
  $.fn.slidingPanels = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.slidingPanels' );
    }    
  };
})(jQuery)
