/**
*please put all jquery custom functions here.
 *
* @author: Kenny Chung
*/
;(function($){
	//add loading spinner
	$.fn.addLoadingSpinner = function(){
		$(this).append('<div class="loading"><img src="../www/img/spinner.gif" alt="some_text"></div>');
		return this;
	};
	//remove loading spinner
	$.fn.removeLoadingSpinner = function(){
		$(this).find('.loading').remove();
		return this;
	};
}(jQuery));