(function(PB){

    PB.view = function( battle, winnerId, loserId ) {

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

    PB.Place = function( json, attributes ) {

        this.id         = json.id;
        this.name       = json.name;

        // If the place has come from a battle result, it will also have a map of attributes (key is attribute id,
        // value is value).
        this.attributes = json.attributes;

        var allAttributes = attributes;
        var stats = json.stats;

        this.getAttribute = function( attrName ) {
            for ( var i = 0; i < allAttributes.length; i ++ ) {
                if ( allAttributes[ i ].name == attrName ) {
                    return allAttributes[ i ];
                }
            }

            throw new Error( "Couldn't find attribute: " + attrName );
        };

        this.isBetterThan = function( that ) {

            var totalThisScore = 0;

            for ( var i = 0; i < allAttributes.length; i ++ ) {
                var attr = allAttributes[ i ];
                var thisValue = this.getValue( attr.name );
                var thatValue = that.getValue( attr.name );
                if ( attr.isBetterThan( thisValue, thatValue ) ) {
                    console.log( attr.label + ": " + this.name + " (" + thisValue + ") is better than " + that.name + " (" + thatValue + ")" );
                    totalThisScore ++;
                } else if ( attr.isBetterThan( thatValue, thisValue ) ) {
                    console.log( attr.label + ": " + that.name + " (" + thatValue + ") is better than " + this.name + " (" + thisValue + ")" );
                    totalThisScore --;
                }
            }

            return totalThisScore > 0;

        };

        this.getValue = function( attributeName ) {
            for ( var i = 0; i < stats.length; i ++ ) {
                if ( stats[ i ].attr == attributeName ) {
                    return stats[ i ].value;
                }
            }
        };

    };

    PB.Attribute = function( json ) {

        this.id             = json.id;
        this.name           = json.name;
        this.description    = json.description;
        this.categoryId     = json.categoryId;
        this.categoryName   = json.categoryName;
        this.positivePhrase = json.positivePhrase;
        this.negativePhrase = json.negativePhrase;

    };

    PB.Battle = function( json ) {

        this.winner     = new PB.Place( json.winner     );
        this.loser      = new PB.Place( json.loser      );
        this.attributes = json.attributes.map(function( item ) {
            return new PB.Attribute( item );
        });

        this.getAttribute = function( id ) {
            for ( var i = 0; i < this.attributes.length; i ++ ) {
                if ( this.attributes[ i ].id == id ) {
                    return this.attributes[ i ];
                }
            }
            return null;
        }

    };
    
    PB.doBattle = function ( battle ) {

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

        PB.view( new PB.Battle( battle ), "winner", "loser" );
    };

})(PB || {});
