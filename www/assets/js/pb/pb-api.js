PB.api = ( function ( module, $ ) {
	module.getAttributes = function() {
		var ajaxOptions = {};
		return $.ajax(ajaxOptions);
	};
	
	return module;
})( PB.api || {}, $ );
