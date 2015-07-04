PB.templates = ( function ( module, Handlebars, $ ){
	module.attributeTemplate = function( itemHeading, attributeLabel ) {
		var source = $("#attribute-template").html();
		var template = Handlebars.compile( source );
		return template( { itemHeading: itemHeading, label: attributeLabel } );
	};
	
	module.battleFieldStartTemplate = function () {
		var source = $("#battle-field-start-template").html();
		var template = Handlebars.compile( source );
		
		return template();	
	};
	
	module.battleFieldResultTemplate = function () {
		var source = $("#battle-field-result-template").html();
		var template = Handlebars.compile( source );
		
		return template();	
	};
	
	return module;
} )( PB.templates || {}, Handlebars || {}, $ );
