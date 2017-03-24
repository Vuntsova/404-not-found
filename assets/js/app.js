//global variables
var city = {
    lat: 1,
    lng: 1
};
var timer = 60;
var citySearch;
var locationArray = [];
var videoId;
var userScore = 0;

var delayNum;
var userNameVal;
var sortPlayers;

//City objects
var shanghai = {
        lat: 31.230416,
        lng: 121.473701
    },

    karachi = {
        lat: 24.861462,
        lng: 67.009939
    },

    delhi = {
        lat: 28.661898,
        lng: 77.227396
    },
    bucharest = {
        lat: 44.426767,
        lng: 26.102538
    },
    lagos = {
        lat: 6.524379,
        lng: 3.379206
    },
    tokyo = {
        lat: 35.689488,
        lng: 139.691706
    },
    bogota = {
        lat: 4.710989,
        lng: -74.072092
    },
    riyadh = {
        lat: 24.713552,
        lng: 46.675296
    },
    wellington = {
        lat: -41.28646,
        lng: 174.776236
    },
    sophia = {
        lat: 42.6977081999,
        lng: 23.3218675000
    },

    orlando = {
        lat: 28.538336,
        lng: -81.379236
    };

    //players object
var players = [
        {
            name:'The Rock',
            score: 120
        }
]
//Capture value of userInput   
$('#playBtn').on('click',function(){

    userNameVal = $('#username').val();
    console.log(userNameVal);

    return false;
   });

locationArray = [shanghai, karachi, delhi, bucharest, lagos, tokyo, bogota, riyadh, wellington, sophia, orlando];

//Chooses a random city
function setRandomLocation() {
    citySearch = locationArray[Math.floor(Math.random() * locationArray.length)];
}

//Searches Youtube by keyword, chooses a random location, plays the video
function playRandomVideo (searchTerm){
    //set random location
    setRandomLocation();

    //youtube parameters
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
    var q = "&q=" + searchTerm;
    var locationQ = "&location=" + citySearch.lat + "," + citySearch.lng;
    var locationRadius = "&locationRadius=100mi";
    var embeddable="&videoEmbeddable=true";
    var type = "&type=video";
    var key = "&key=AIzaSyCTNUZm5iZT1W_OICKJCKFqFWrLr3bZNjM";

    var query = url+q+locationQ+locationRadius+embeddable+type+key;

    $.ajax({
        url: query,
        method: "GET"
    })

    //response
        .done(function (response) {
            videoId = response.items[0].id.videoId;
            console.log("response", videoId);

            getVideoDetails(videoId);
            player.loadVideoById({
                videoId: videoId,
                endSeconds: 60
            });
        })
}

//This function gets the coordinates of the video
function getVideoDetails(id) {

    var videoQuery = "https://www.googleapis.com/youtube/v3/videos?part=snippet,recordingDetails&id=" + id + "&key=AIzaSyCTNUZm5iZT1W_OICKJCKFqFWrLr3bZNjM";

    //call to get video info
    $.ajax({
        url: videoQuery,
        method: "GET"
    })

    //sets location data from youtube
        .done(function (response){
            city.lat = response.items[0].recordingDetails.location.latitude;
            city.lng = response.items[0].recordingDetails.location.longitude;
        });
}

function loadPlayer() {

    $.getScript("https://www.youtube.com/iframe_api").fail(function () {
        $('#video').html("Unable to play video");
        console.log("error");
    })
        .done(function () {
            window.onYouTubeIframeAPIReady = function () {
                player = new YT.Player('player', {
                    width: '640',
                    height: '390',
                    videoId: "NpEaa2P7qZI",
                    playerVars: {'autoplay': 0, 'controls': 0, 'showinfo': 0, "end": 60},
                    events: {
                        'onReady': function () {
                            console.log("player ready");
                        },
                        'onStateChange': onPlayerStateChange
                    }
                })
            }
        });
}

function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED) {
        //player.playVideo();
        $('#head').css({"background-color":"#aaa"});
    }

    if(event.data == YT.PlayerState.PLAYING) {
        //initialize map
        initMap();
        //start timer
        startTimer();
    }
}

//Where the map is viewed when page loads 
var startDisp = {lat: 0, lng: 0};
var getMap = document.getElementById('map');
var marker;
var randomMarker;
var questionCounter = 0;
var options1 = {
    //Zooms in or out on the map
    zoom: 1,
    //removes map/satalite option
    mapTypeControl : false,
    //Displays map starting at certain location
    center: startDisp,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}]
};
var options2 = {
    //Zooms in or out on the map
    zoom: 1,
    //removes map/satalite option
    mapTypeControl : false,
    //Displays map starting at certain location
    center: startDisp,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}],
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
};

function initMap() {
    //Displays initial map
    var map = new google.maps.Map(getMap,options1);

    // When area on map is clicked......
    google.maps.event.addListener(map,'click',function(event) {

        //Prevents the map from being clicked a second time after choosing location
        map = new google.maps.Map(getMap,options1);
        //Displays marker on map depending on users longitude/latitude
        randomMarker = new google.maps.Marker({
            //Puts marker at location basec on "randomLongLat" value
            position: city,
            map: map,
            icon:'https://maps.google.com/mapfiles/kml/paddle/red-stars.png'
        });

        //Gets the latitude and longitude
        longitude = event.latLng.lat();
        laditude = event.latLng.lng();

        //Sets Marker
        placeMarkerAndPanTo(event.latLng, map);
        //Displays Longitude and Latitude in Console
        console.log('Longitude: ' + longitude);
        console.log('Latitude: ' + laditude);
        //Random location
        var latLngA = new google.maps.LatLng(city.lat, city.lng);
        //Saves click location to latLngB
        var latLngB = new google.maps.LatLng(longitude,laditude);
        //Returns the distance of two points in miles
        var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB)/(1000 *  0.6214);
        //Update Score
        calculateScore(distance);
        //Stop Timer
        stopTimer();
        //Testing
        console.log('Distance between two points: ' + Math.round(distance) + ' miles');
        //Draws Line
        var line = new google.maps.Polyline({
            path: [
                new google.maps.LatLng(city),
                new google.maps.LatLng(longitude, laditude)
            ],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            map: map
        });
        //Content to be displayed in info-box
        var contentString = 'You were ' + Math.round(distance) + ' miles off'
        //Creates info-window
        var infowindow = new google.maps.InfoWindow({
            //Sets parameters for the info-window (content and size)
            content: contentString,
            maxWidth:200
        });
        //displays info box on marker
        infowindow.open(map,randomMarker);
        if(questionCounter > 4) {
            console.log("GAME OVER!");
            gameOver();
        }

        //reenable button
        $(".play-btn").prop('disabled', false);
        $(".play-btn").removeClass("disabled");
    });
}
//Leader Board
function leaderBoard() {

    delayNum = 0.0;
    //removes first object section
    sortPlayers = players.slice(0);
    //sorts object by score from highiest to lowest
    sortPlayers.sort(function(a,b){
        //returns highest to lowest
        return b.score - a.score;
        //leaderBoard(delayNum, sortPlayers);
    });

    //Creates 10 tr tags
    for(var i=0; i < players.length || i < 10; i++){
        var newTr = $('<tr>');
            //Creates 3 th tags and 1 div tag
            for(var j = 0; j < 3; j++){
                var newTh = $('<th>');
                var newDiv =  $('<div>');
                //Gives div a class and style
                newDiv.attr('class','animated zoomInDown');
                newDiv.attr('style',"-webkit-animation-delay: " +
                             delayNum.toFixed(1) + 's;');
                //adds player number to first row
                if(j === 0){
                    newDiv.text(i + 1);
                }
                //adds name to second row
                else if(j === 1){
                    newDiv.text(sortPlayers[i]['name']);
                }
                //adds score to third row
                else if(j === 2){
                    newDiv.text(sortPlayers[i]['score']);
                 }
                    //appends div to Th
                    newDiv.appendTo(newTh);
                    //appends the th with the div in it to tr
                    newTh.appendTo(newTr);
            }
            //Adds 1 to delats number so every row animates one after another
            delayNum = delayNum + 0.1;
        //Adds the tr to the dom
        $('.leaderBoard').append(newTr);
    }
}

// When the play button is clicked..........
$('.play-btn').on('click',function(){
    if($(this).prop('disabled'))
    {
        return;
    }

    //Continue to the next video
    nextVid();
});

//Function to create marker
function placeMarkerAndPanTo(latLng, map) {
    marker = new google.maps.Marker({
        position: latLng,
        map: map
    });

}

function nextVid(){
    //Resets long/lat
    city = locationArray[Math.floor(Math.random() * locationArray.length)];
    //Iterates the question counter
    questionCounter++;
    //Plays next video / resets map
    playRandomVideo("nature");
    //initMap();
    $(".play-btn").prop('disabled', true);
    $(".play-btn").addClass("disabled")
}

//Game Logic
function gameInitialize()
{
    questionCounter = 0;
    userScore = 0;
    loadPlayer();
    $(".total").html("0");
    //Loads leaderBoard
    //leaderBoard();
}

function calculateScore(miles)
{
    //Calculate and update score
    var pointsEarned = Math.round((24901 - miles) / 10);
    userScore += parseFloat(pointsEarned);

    //Display Scores
    $(".current").html(pointsEarned.toLocaleString());
    $(".total").html(userScore.toLocaleString());
    console.log("SC:" + userScore);// added by me
    console.log("question", questionCounter);

}

var timerId;

function countdown() {
    //Decrement timer
    timer-- ;

    //Update page
    $(".centered4").text(timer);

    if(timer < 1){
        player.stopVideo();
        calculateScore(26000);
        stopTimer();
        //Creates new map and disables drag, zoom and click options
        map = new google.maps.Map(getMap,options2);
        //reenable button
        $(".play-btn").prop('disabled', false);
        $(".play-btn").removeClass("disabled");
         if(questionCounter > 4) {
            console.log("GAME OVER!");
            gameOver();
        }
    }
}

function startTimer(){
    //Set Timer Value
    timer = 60;

    timerId = setInterval(countdown, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function gameOver() {
    //stop all video

    //push score to firebase
    pushtoFirebase();

    //display game over modal
    setTimeout(function () {
        $("#mainPage").hide();
        $("#overPage").show();
        $('.leaderBoard').empty();
    }, 5000);
    //hide play button
    $(".play-btn").hide();
}