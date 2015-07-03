window.PB = PB || {};

(function(){

    PB.View = function( place1, place2, winnerId, loserId ) {
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

        var constructDiv = function( place, domId ) {

            var div = $( domId );
            div.find( '.panel-heading' ).html( place.name );

        };

        constructDiv( winner, winnerId );
        constructDiv( loser , loserId  );

    };

    PB.Place = function( json ) {

        this.name = json.name;
        this.stats = [];

        this.isBetterThan = function( place ) {

            var thisScore = 0;

            for ( var i = 0; i < this.stats.length; i ++ ) {
                var stat = place.stats[ j ];
                for ( var j = 0; j < place.stats.length; j ++ ) {
                    var otherStat = place.stats[ j ];
                    if ( stat.name == otherStat.name ) {
                        if ( stat.value > otherStat.value ) {
                            thisScore ++;
                        } else if ( stat.value < otherStat.value ) {
                            thisScore --;
                        }
                        break;
                    }
                }

            }

            return thisScore > 0;

        }

    };

    PB.Attribute = function( json ) {

        this.name = json.name;
        this.description = json.description;
        this.value = 0;

    };

})();