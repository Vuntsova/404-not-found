//Making Sure the page is loaded before run javaScript
//====================================================
$(document).ready(function() {
 // Disable Play Button if no user input
    $("#playBtn").attr("disabled", true);
    $("#username").keyup(function () {
        if($(this).val().length != 0)
            $("#playBtn").attr("disabled", false);
        else
            $("#playBtn").attr("disabled", true);

    });

//Initialize Game
    gameInitialize();

//Start the game on click and hide the first page
    var soundEngaged = $("#beep")[0];
    $(".sound")
        .mouseenter(function() {
            soundEngaged.play();
        });

    $("#overPage").hide();
    $("#mainPage").hide();
    $("#playBtn").click(function(){

        $("#startPage").hide();
        $('#mainPage').show();
        nextVid();
        return false;
    });
//==================================================

});  //ending document.ready