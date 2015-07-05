$(document).ready(function () {

    if (window.location.hash !== "") {
        var pattern = /^\#why-is-(.+)-better-than-(.+)$/,
            result = pattern.exec(window.location.hash);

        if (result === undefined || result[1] === "" || result[2] === "") {
            window.location = "index.html";
        }
        else {
            $("#app-main").html(PB.templates.battleFieldResultTemplate());
            $(".page-header h2").text(result[1] + " vs. " + result[2]);
            radio("getBattle.done").subscribe(function (battleresult) {
                PB.Controller.doBattle( battleresult );
            });

            PB.BattleController.getBattle( result[1], result[2]);
        }
    }
    else {
        PB.LGAController.getLocalAuthorities();
        PB.AttributeController.getAttributes();

        $("#app-main").html(PB.templates.battleFieldStartTemplate());


        //
        //var p = $('#gallery').portfolio({
        //    enableKeyboardNavigation: true, // enable / disable keyboard navigation (default: true)
        //    loop: true, // loop on / off (default: false)
        //    easingMethod: 'easeOutQuint', // other easing methods please refer: http://gsgd.co.uk/sandbox/jquery/easing/
        //    height: '200px', // gallery height
        //    width: '100%', // gallery width in pixels or in percentage
        //    lightbox: false, // dim off other images, highlights only currently viewing image
        //    showArrows: true, // show next / prev buttons
        //    logger: true, // for debugging purpose, turns on/off console.log() statements in the script
        //    spinnerColor: '#000', // Ajax loader color
        //    offsetLeft: -4, // position left value for current image
        //    opacityLightbox: '0.2' // opacity of other images which are not active
        //    //opacityLightbox: '1' // opacity of other images which are not active
        //
        //});
        var p = $("#gallery").portfolio({
            height: '70%', // gallery height
            loop: true,
            enableKeyboardNavigation: true, // enable / disable keyboard navigation (default: true)
            easingMethod: 'easeOutQuint', // other easing methods please refer: http://gsgd.co.uk/sandbox/jquery/easing/
            width: '100%', // gallery width in pixels or in percentage
            lightbox: true, // dim off other images, highlights only currently viewing image
            showArrows: true, // show next / prev buttons
            logger: false, // for debugging purpose, turns on/off console.log() statements in the script
            spinnerColor: '#000', // Ajax loader color
            offsetLeft: -4, // position left value for current image
            opacityLightbox: '0.2' // opacity of other images which are not active
        });
        p.init();

        $("#do-battle").click(function (e) {
            e.originalEvent.preventDefault();
            $("#app-main").html(PB.templates.battleFieldResultTemplate());
            $(".page-header h2").text("a" + " vs. " + "b");
            PB.Controller.doBattle({});
            window.location.href = "index.html" + PB.HASH_URL_TEMPLATE.replace("{good_key}", "a").replace("{bad_key}", "b");
        });

        // radio test.
        radio("getLocalAuthority.done").subscribe(function (data) {
            debugger;
        });
    }
});

