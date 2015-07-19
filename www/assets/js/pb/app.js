var generateBattleResults = function (winnerName, loserName) {
    var winnerId;
    var loserId;

    for (var index in PB.LGAs) {
        if (winnerId && loserId) {
            break;
        }

        if (PB.LGAs[index].name === winnerName) {
            winnerId = PB.LGAs[index].id;
        }

        if (PB.LGAs[index].name === loserName) {
            loserId = PB.LGAs[index].id;
        }
    }

    PB.BattleController.getBattle(winnerId, loserId);
};

PB.processCurrentPage = function () {
    // make sure nothing happense prior to loading local authorities

    var highlightNav = function (id) {
        $('#navbar').find('.navbar-link').removeClass("active");
        $('#' + id).addClass("active");
    };
    
    var resetSocialMedia = function () {
        $(".social-media").html(PB.templates.socialMedia.facebookTemplate());
        FB.XFBML.parse();  
    };

    var app = Sammy(function () {
        
        // define route
        this.get(PB.URL_FRAGMENTS.WHO_WE_ARE, function () {
            highlightNav('about-nav');
            $('#app-main').html(PB.templates.whoAreWeTemplate());
            resetSocialMedia();
        });

        this.get(PB.URL_FRAGMENTS.SHOW_LIVEABILITY, function () {
            highlightNav('liveability-nav');
            $('#app-main').html(PB.templates.liveabilityIndexTemplate());
            tableau._createNewVizesAndStartLoading();
            resetSocialMedia();
        });

        this.get(PB.URL_FRAGMENTS.RUN_BATTLE, function () {
            var params = this.params["splat"],
                winnerName = params[0],
                loserName = params[1];

            $(".page-header h2").text(winnerName + " vs. " + loserName);

            generateBattleResults(winnerName, loserName);
            resetSocialMedia();
        });

        this.get(PB.URL_FRAGMENTS.SHOW_BATTLE, function (context) {
            $("#app-main").html(PB.templates.battleFieldStartTemplate());

            var $winnerList = $('#winning-suburb');
            var $loserList = $('#losing-suburb');
            PB.LGAs.forEach(function (item) {
                $('<option>', { value: item.id }).appendTo($winnerList).text(item.name);
                $('<option>', { value: item.id }).appendTo($loserList).text(item.name);
            });

            $winnerList.chosen();
            $loserList.chosen();

            var p = $("#gallery").portfolio({
                height: '70%', // gallery height
                loop: true,
                enableKeyboardNavigation: true, // enable / disable keyboard navigation (default: true)
                easingMethod: 'easeOutQuint', // other easing methods please refer: http://gsgd.co.uk/sandbox/jquery/easing/
                width: '100%', // gallery width in pixels or in percentage
                lightbox: false, // dim off other images, highlights only currently viewing image
                showArrows: true, // show next / prev buttons
                logger: false, // for debugging purpose, turns on/off console.log() statements in the script
                spinnerColor: '#000', // Ajax loader color
                offsetLeft: -4, // position left value for current image
                opacityLightbox: '0.2' // opacity of other images which are not active
            });
            p.init();

            var doBattleClickHandler = function (e) {
                e.originalEvent.preventDefault();

                var winnerId = $winnerList.val(),
                    loserId = $loserList.val(),
                    winnerName,
                    loserName;

                for (var index in PB.LGAs) {
                    if (winnerName && loserName) {
                        break;
                    }

                    if (PB.LGAs[index].id === winnerId) {
                        winnerName = PB.LGAs[index].name;
                    }

                    if (PB.LGAs[index].id === loserId) {
                        loserName = PB.LGAs[index].name;
                    }
                }
                
                context.redirect(PB.HASH_URL_TEMPLATE.replace("{good_key}", winnerName).replace("{bad_key}", loserName));
            };

            $("#do-battle").click(doBattleClickHandler);

            highlightNav('battle-nav');
            resetSocialMedia();
        });

        // default route, if nothing matches. So you want to 
        // add new routes above this comments.
        this.get("", function () {
            this.redirect(PB.URL_FRAGMENTS.SHOW_BATTLE);
        });
    });

    app.run(window.location.hash);
};

$(document).ready(function () {

    // hook up custom event handlers
    radio("getBattle.done").subscribe(function (battleresult) {
        $("#app-main").html(PB.templates.battleFieldResultTemplate());
        PB.Controller.doBattle(battleresult);
    });

    radio("getLocalAuthority.done").subscribe(function (data) {
        // TODO: do something when getLocalAuthority is done.
    });

    radio("getLocalAuthorities.done").subscribe(PB.processCurrentPage);

    PB.LGAController.getLocalAuthorities();
});

