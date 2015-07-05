PB.Controller = (function (module) {
	
	module.view = function( battle, winnerId, loserId ) {

        var winner = battle.winner;
        var loser  = battle.loser;

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
                attrDiv.append( PB.templates.attributeTemplate( attribute.name , label, isWinner ) );
            }
        };

        constructDiv( battle.winner, winnerId, true );
        constructDiv( battle.loser,  loserId, false );

    };
	
    module.doBattle = function ( battle ) {

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

        module.view( battle, "winner", "loser" );
    };
    
	return module;
})(PB.Controller || {});

PB.BattleController = (function ( module, radio ) {
  
  module.getBattle = function ( winner, loser ) {
    PB.api.getBattleByAttendees(winner, loser).then(function ( data ) {
      radio("getBattle.done").broadcast( new PB.Battle ( data ) );
    }, function (err) {});  
  };
  
  return module;
})(PB.BattleController || {}, radio);

PB.LGAController = (function ( module, radio ) {
  // name can also be partial.
  module.searchAuthoritiesByNameTag = function ( name ) {
    PB.api.getAuthorityNameHint( name ).then(function ( data ) {
      // do something about authority name and id.
      // temp code.
      var authorities = [];
          
      for ( var index in data ) {
        authorities.push( new PB.Authority( data[index] ) );
      }

      radio("searchAuthoritiesByNameTag.done").broadcast(authorities);
    }, function ( err ) {} );
  };
    
  // need to listen to getLocalAuthority.done event.
  module.getLocalAuthority = function ( id ) {
    PB.api.getLocalAuthorityById( id ).then(function ( data ) {
      radio("getLocalAuthority.done").broadcast(new PB.Authority( data ));
    }, function(err){});
  };

  module.getLocalAuthorities = function () {
    PB.api.getLocalAuthorities().then(function (data) {
      for (var index in data) {
          PB.LGAs.push( new PB.Authority( data[index] ) );
      }
      
      radio("getLocalAuthorities.done").broadcast();
    }, function (err) {} );  
  };
  
  return module;
})(PB.LGAController || {}, radio);

PB.AttributeController = (function (module, radio) {
  module.getAttributes = function() {
    PB.api.getAttributes().then(function( data ){

      for (var index in data) {
        PB.Attributes.push( new PB.Attribute( data[index] ) );
      }
      
      radio("getLocalAuthorities.done").broadcast();
    }, function(err){});
  };
  
  return module;  
})(PB.AttributeController || {}, radio);
