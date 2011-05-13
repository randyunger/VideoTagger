/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/9/11
 * Time: 6:00 PM
 * To change this template use File | Settings | File Templates.
 */

(function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){
         $(window).bind('resize.tooltip', methods.reposition);
       });

     }
     ,destroy : function( ) {

       return this.each(function(){
         $(window).unbind('.tooltip');
       })

     }
     ,reposition : function( ) {}
  };

  $.fn.tooltip = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }

  };

})( jQuery );