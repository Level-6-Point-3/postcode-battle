PB.templates = ( function ( module, Handlebars, $ ){
	module.attributeTemplate = function( itemHeading, attributeLabel, isWinner ) {
		var source = $("#attribute-template").html();
		var template = Handlebars.compile( source );
		return template( { itemHeading: itemHeading, label: attributeLabel, winner: isWinner } );
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

	module.whoAreWeTemplate = function () {
		var source = $("#who-are-we-template").html();
		var template = Handlebars.compile( source );

		return template();
	};
	
	return module;
} )( PB.templates || {}, Handlebars || {}, $ );
