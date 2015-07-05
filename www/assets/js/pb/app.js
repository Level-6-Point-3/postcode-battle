var generateBattleResults = function (winnerName, loserName) {
    var winnerId;
    var loserId;
            
    for (var index in PB.LGAs){
        if(winnerId && loserId){
            break;
        }
                
        if(PB.LGAs[index].name === winnerName) {
            winnerId = PB.LGAs[index].id;
            continue;
        }
        else if(PB.LGAs[index].name === loserName) {
            loserId = PB.LGAs[index].id;
            continue;
        }
    }
            
    PB.BattleController.getBattle( winnerId, loserId );
};

$(document).ready(function () {
    
    radio("getBattle.done").subscribe(function (battleresult) {
        PB.Controller.doBattle( battleresult );
    });
    
    // radio test.
    radio("getLocalAuthority.done").subscribe(function (data) {
        debugger;
    });
    
    radio("getLocalAuthorities.done").subscribe(function () {
        // make sure nothing happense prior to loading local authorities
        
        if (window.location.hash !== "") {
            var pattern = /^\#why-is-(.+)-better-than-(.+)$/,
            result = pattern.exec(window.location.hash);

            if (result === undefined || result[1] === "" || result[2] === "") {
                window.location = "index.html";
            }
            else {
                $("#app-main").html(PB.templates.battleFieldResultTemplate());
                $(".page-header h2").text(result[1] + " vs. " + result[2]);
            
                generateBattleResults(result[1], result[2]);
            }
        }
        else {
            $("#app-main").html(PB.templates.battleFieldStartTemplate());
            var p = $("#gallery").portfolio();
            p.init();
        
            $("#do-battle").click(function (e) {
                e.originalEvent.preventDefault();           

                var $winner = $("#winning-suburb"),
                    $loser = $("#losing-suburb"),
                    winnerName = $winner.val(),
                    loserName = $loser.val();

                $(".page-header h2").text(winnerName + " vs. " + loserName);
              
                $("#app-main").html(PB.templates.battleFieldResultTemplate());
                generateBattleResults( winnerName, loserName );
                window.location.href = "index.html" + PB.HASH_URL_TEMPLATE.replace("{good_key}", winnerName).replace("{bad_key}", loserName);
            });
        }
    });

    PB.LGAController.getLocalAuthorities();
});
