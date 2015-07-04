// low level lga rest API wrapping.
PB.api = ( function ( module, $ ) {
  var host = function () {
    if(PB.env === "dev") {
      return "localhost:8080";
    }
    else if (PB.env === "live") {
      return "http://postcode-battle.serwylo.com";
    }

    return "";
  };

  var initAjaxOptions = function () {
    return { dataType: 'json', contentType: 'application/json' };	
  };
  
  module.getAutorityNameHint = function ( text ) {
    var ajaxOptions = initAjaxOptions();
    ajaxOptions.url = "/rest/lga/search/" + text;
    ajaxOptions.type = "GET";
    return $.ajax(ajaxOptions);
  };
	
  module.getLocalAuthorities = function () {
    var ajaxOptions = initAjaxOptions();
    ajaxOptions.url = "/rest/lga/list";
    ajaxOptions.type = "GET";
    return $.ajax(ajaxOptions);
  };
  
  module.getAttributes = function () {
    var ajaxOptions = initAjaxOptions();
    ajaxOptions.url = "/rest/attributes/list";
    ajaxOptions.type = "GET";
    return $.ajax(ajaxOptions);
  };
  
  module.getLocalAuthorityById = function ( localAuthorityId ) {
    var ajaxOptions = initAjaxOptions();
    ajaxOptions.url = "/rest/lga/" + localAuthorityId.toString();
    ajaxOptions.type = "GET";
    return $.ajax(ajaxOptions);
  };
  
  module.getBattleByAttendees = function ( winner, loser ) {
    var ajaxOptions = initAjaxOptions();
    ajaxOptions.url = "/battle/" + winner + "/" + loser;
    ajaxOptions.type = "GET";
    return $.ajax(ajaxOptions);
  };
  
  return module;
})( PB.api || {}, $ );
