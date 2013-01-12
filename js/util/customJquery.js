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

	//Hack - add reverce feature for slider
	var oldRefresh=$.mobile.slider.prototype.refresh;
	$.mobile.slider.prototype.refresh=function() {
		oldRefresh.apply(this, arguments);
		var control = this.element;
		if(control.data('reverse')){
			var min=parseFloat(control.attr( "min" )),
				max=parseFloat(control.attr( "max" )),
				val=parseFloat(control.val());
				control.val(max+min-val);


		}
	}

	//I thinks this bug in jquery mobile to close dialog - fix this
	var oldCreate=$.mobile.dialog.prototype._create;
	$.mobile.dialog.prototype._create=function() {
		oldCreate.apply(this, arguments);
		this.element.find('a[data-icon=delete]').on('click',function(e){
			e.preventDefault();
		})
	}

	//overdite default dailog close - use backbone history navigate
	$.mobile.dialog.prototype.close= function() {
		var dst;
		if ( this._isCloseable ) {
			this._isCloseable = false;
			if ( $.mobile.hashListeningEnabled ) {
				$.mobile.back();
			} else {
				dst = $.mobile.urlHistory.getPrev().url;
				if ( !$.mobile.path.isPath( dst ) ) {
					dst = $.mobile.path.makeUrlAbsolute( "#" + dst );
				}

				$.mobile.changePage( dst, { changeHash: false, fromHashChange: true } );
				Backbone.history.navigate(dst,{trigger: false});
			}
		}
	}

}(jQuery));