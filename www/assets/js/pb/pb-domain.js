(function(PB){
    
    PB.Place = function( json, attributes ) {

        this.name = json.name;

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

        var comparators = {
            higher: function (isThis, betterThanThat) {
                return isThis > betterThanThat
            },
            lower: function (isThis, betterThanThat) {
                return isThis < betterThanThat
            }
        };

        var betterLabelers = {
            higher: function() {
                return "SO MUCH MOAR!!!";
            },
            lower: function() {
                return "MUCH LESS!";
            }
        };

        var worseLabelers = {
            higher: function() {
                return "Oh, not enough for you?";
            },
            lower: function() {
                return "Far too much...";
            }
        };

        this.name = json.name;
        this.label = json.label;
        this.description = json.description;

        if ( !comparators.hasOwnProperty( json.betterIf ) ) {
            throw new Error( "Couldn't find betterIf comparator: " + json.betterIf );
        }

        if ( !betterLabelers.hasOwnProperty( json.betterIf ) ) {
            throw new Error( "Couldn't find betterIf better labeler: " + json.betterIf );
        }

        if ( !worseLabelers.hasOwnProperty( json.betterIf ) ) {
            throw new Error( "Couldn't find betterIf worse labeler: " + json.betterIf );
        }

        this.isBetterThan   = comparators[ json.betterIf ];
        this.getBetterLabel = betterLabelers[ json.betterIf ];
        this.getWorseLabel  = worseLabelers[ json.betterIf ];

    };   

})(PB || {});
