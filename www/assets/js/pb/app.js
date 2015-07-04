$(document).ready( function () {
  var url = window.location.href.toString(),
    urlArray = url.split("#"),
    isBattleSpecified = false;

  if(window.location.hash !== "") {
    var pattern = /^\#why-is-(.+)-better-than-(.+)$/,
      result = pattern.exec(window.location.hash);

    if(result === undefined || result[1] === "" || result[2] === "") {
      window.location="index.html";
    }
    else {
      $("#app-main").html(PB.templates.battleFieldResultTemplate());
      $(".page-header h2").text(result[1] + " vs. " + result[2]);  
      PB.Controller.doBattle({});
    }
  }
  else {
    $("#app-main").html(PB.templates.battleFieldStartTemplate());	
    $("#do-battle").click( function (e) {
      e.originalEvent.preventDefault();		
      $("#app-main").html(PB.templates.battleFieldResultTemplate());
      $(".page-header h2").text("a" + " vs. " + "b");		
		  PB.Controller.doBattle({});
      window.location.href = "index.html" + PB.HASH_URL_TEMPLATE.replace( "{good_key}", "a" ).replace( "{bad_key}", "b" );
    });
  }
});
