(function(PB){

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
        
        this.id                     = json.attributeId;
        this.name                   = json.attributeName;
        this.description            = json.attributeDescription;
        this.categoryId             = json.categoryId;
        this.categoryName           = json.categoryName;
        this.positivePhrase         = json.positivePhrase;
        this.negativePhrase         = json.negativePhrase;
        this.dataSourceData         = json.dataSourceDate;
        this.dataSourceLink         = json.dataSourceLink;
        this.dataSourceRationale    = json.dataSourceRationale;
        this.denominatorRationale   = json.denominatorRationale;
        this.comparator             = json.comparator;
        this.denominator            = json.denominator;
    };
    
    PB.Authority = function ( json ) {
      this.id   = json.id;
      this.name = json.name;  
    };

    PB.Battle = function( json ) {

        this.winner     = new PB.Place( json.winner );
        this.loser      = new PB.Place( json.loser );
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
        };

    };
    
    PB.doBattle = function ( battle ) {

        /*battle = new PB.Battle( {
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
        } );*/

        PB.view( battle, "winner", "loser" );
    };

})(PB || {});
