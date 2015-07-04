$(document).ready( function () {
  $("#app-main").html(PB.templates.battleFieldStartTemplate());
	
  $("#do-battle").click( function (e) {
    e.originalEvent.preventDefault();		
    $("#app-main").html(PB.templates.battleFieldResultTemplate());		
		PB.DoBattle();
  });
});
