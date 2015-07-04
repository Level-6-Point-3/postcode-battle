PB.Controller = (function (module) {
	
	module.view = function( place1, place2, winnerId, loserId, attributes ) {
        var winner;
        var loser;
        if ( place1.isBetterThan( place2 ) ) {
            winner = place1;
            loser  = place2;
        } else {
            // TODO: Draw ("Boronia is EXACTLY AS GOOD/BAD as Brunswick")
            winner = place2;
            loser  = place1;
        }

        console.log( "Winner: " + winner.name + ", Loser: " + loser.name );

        var attributesToShow = [];
        for ( var i = 0; i < attributes.length; i ++ ) {
            var attr = attributes[ i ];
            if ( attr.isBetterThan( winner.getValue( attr.name ), loser.getValue( attr.name ) ) ) {
                attributesToShow.push( attr );
            }
        }

        /**
         * Set up the relevant attributes in a list, showing labels to depict whether they are better or worse.
         * @param place
         * @param domId
         * @param isWinner
         */
        var constructDiv = function( place, domId, isWinner ) {

            var div = $( '#' + domId );
            div.find( '.panel-heading .text').html( place.name );

            var attrDiv = div.find( '.panel-body .attributes' );
            attrDiv.html( "" );

            for ( var i = 0; i < attributesToShow.length; i ++ ) {
                var attrToRender = attributesToShow[ i ];
                var label = isWinner ? attrToRender.getBetterLabel() : attrToRender.getWorseLabel();
                var betterOrWorse = isWinner ? "BETTER" : "WORSE";
                var itemHeading = betterOrWorse + " " + attrToRender.label + "!";
                attrDiv.append(PB.templates.attributeTemplate(itemHeading, label));
            } // OMG SO l33t!?!!!

        };

        constructDiv( winner, winnerId, true );
        constructDiv( loser , loserId, false );
    };
	
    module.doBattle = function ( mrWinner, sadLoser ) {
      var attributes = [
            {
                name : "health",
                label : "Health",
                description: "Number of hospitals",
                betterIf: "higher"
            },
            {
                name : "house-affordability",
                label : "House prices",
                description: "Median house price",
                betterIf: "lower"
            }
        ];

        var places = {
            boronia : {
                name : "Boronia",
                stats : [
                    { attr: "health", value : 13 },
                    { attr: "house-affordability", value : 1110440.12 }
                ]
            },
            brunswick : {
                name : "Brunswick",
                stats : [
                    { attr: "health", value : 120 },
                    { attr: "house-affordability", value : 215044.12 }
                ]
            }
        };

        var attrs = attributes.map( function( item ) {
            return new PB.Attribute( item );
        });

        var place1 = new PB.Place( places.boronia,   attrs );
        var place2 = new PB.Place( places.brunswick, attrs );

        module.view( place2, place1, "winner", "loser", attrs );  
    };
    
	return module;
})(PB.Controller || {});
