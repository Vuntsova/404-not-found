//Making Sure the page is loaded before run javaScript
//====================================================
$(document).ready(function() {

//Initialize Game
    gameInitialize();

//Start the game on click and hide the first page
    var soundEngaged = $("#beep")[0];
    $(".sound")
        .mouseenter(function() {
            soundEngaged.play();
        });

    $("#mainPage").hide();
    $("#playBtn").click(function(){

        $("#startPage").hide();
        $('#mainPage').show();
        nextVid();
        return false;
    });
//==================================================

});  //ending document.ready