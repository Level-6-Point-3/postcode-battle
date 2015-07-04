PB.templates = ( function ( module, Handlebars, $ ){
	module.attributeTemplate = function( itemHeading, attributeLabel ) {
		var source = $("#attribute-template").html();
		var template = Handlebars.compile( source );
		return template( { itemHeading: itemHeading, label: attributeLabel } );
	};
	
	return module;
} )( PB.templates || {}, Handlebars || {}, $ );
