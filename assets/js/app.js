//global variables
var city = {
    lat: 1,
    lng: 1
};

var citySearch;
var locationArray = [];
var videoId;

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

locationArray = [shanghai, karachi, delhi, bucharest, tokyo, bogota, riyadh, wellington, sophia, orlando];

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
            player.loadVideoById(videoId, 0, 60);
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
                    playerVars: {'autoplay': 1, 'controls': 0, 'showinfo': 0, "end": 60},
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
        player.destroy();
        $('#head').css({"background-color":"#aaa"});
    }
}

loadPlayer();
setTimeout(function(){ playRandomVideo(); }, 2000);

//Where the map is viewed when page loads 
var startDisp = {lat: 0, lng: 0};
var getMap = document.getElementById('map');
var marker;
var randomMarker;
var questionCounter = 0;
var options1 = {
        //Zooms in or out on the map
        zoom: 1,
        //Displays map starting at certain location
        center: startDisp,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}]
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
       
        // When the user clicks on the button, open the modal 
            var latInfo = city.lat;
            var longInfo = city.lng;
            console.log('randomLat ' + latInfo);
            console.log('randomLong ' + longInfo);
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latInfo + ',' + longInfo + '&sensor=true',
                method: 'GET'
            })
            .done(function(response){
                console.log(response);
                //Displays infobox above random marker
                var contentString = 'The area is ' + response['results'][0]['formatted_address'] +
                                          ' and you were ' + Math.round(distance) + ' miles off' + 
                                          '<br>' + '<br>' + 
                                          'Double-Click anywhere to continue';
                var infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth:200
                });
                //displays info box on marker
                infowindow.open(map,randomMarker);
                // When map is clicked after info box is displayed it goes to the next question
                google.maps.event.addListener(map, 'dblclick', function() {
                    if(infowindow){
                       //adds 1 to question counter
                       questionCounter++;
                       //Closes info box above marker
                       infowindow.close();
                       //goes to the next question
                       nextQuestion();
                    }
                });

            });
    });
         
}
//Function to create marker
function placeMarkerAndPanTo(latLng, map) {
    marker = new google.maps.Marker({
        position: latLng,
        map: map
    });

}
function nextQuestion(){
    //Resets long/lat
    city = locationArray[Math.floor(Math.random() * locationArray.length)];
    //Calls function to jump to the next question
    console.log('question number ' + questionCounter);
    if(questionCounter < 10){
        playRandomVideo();
        initMap();
    }
    else{
        alert('Game Over');
    }
}




