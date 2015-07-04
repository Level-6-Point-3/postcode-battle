PB.Controller = (function (module) {
	
	module.view = function( battle, winnerId, loserId ) {

        var winner = battle.winner;
        var loser  = battle.loser;

        console.log( "Winner: " + winner.name + ", Loser: " + loser.name );

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

            for ( var attrId in winner.attributes ) {
                var value     = winner.attributes[ attrId ];
                var attribute = battle.getAttribute( attrId );

                if ( attribute == null ) {
                    throw new Error( "Couldn't find attribute: " + attrId );
                }

                var label = isWinner ? attribute.positivePhrase : attribute.negativePhrase;
                var betterOrWorse = isWinner ? "BETTER" : "WORSE";
                var itemHeading = betterOrWorse + " " + attribute.name + "!";
                attrDiv.append(PB.templates.attributeTemplate(itemHeading, label));
            } // OMG SO l33t!?!!!

        };

        constructDiv( battle.winner, winnerId, true );
        constructDiv( battle.loser,  loserId, false );

    };
	
    module.doBattle = function ( battle ) {

        battle = {
            loser : {
                id : '1',
                name : "Boronia",
                attributes : {
                    '1' : 13,
                    '2' : 1110440.12
                }
            },
            winner : {
                id : '2',
                name : "Brunswick",
                attributes : {
                    '1' : 120,
                    '2' : 215044.12
                }
            },
            attributes: [
                {
                    id             : '1',
                    name           : 'Health',
                    description    : 'Number of hospitals',
                    categoryId     : '',
                    categoryName   : '',
                    positivePhrase : 'YAY!',
                    negativePhrase : 'BOO!'
                },
                {
                    id             : '2',
                    name           : 'House prices',
                    description    : 'Median house price',
                    categoryId     : '',
                    categoryName   : '',
                    positivePhrase : 'YAY HOUSES!',
                    negativePhrase : 'BOO HOUSES!'
                }
            ]
        };

        module.view( new PB.Battle( battle ), "winner", "loser" );
    };
    
	return module;
})(PB.Controller || {});
