var city = {
    lat: 1,
    long: 1
};

var citySearch;
var locationArray = [];
var videoId;

$().ready(function () {
    youtubeSearch("cats");
});

//City objects
var shanghai = {
        lat: 31.230416,
        long: 121.473701
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

locationArray = [shanghai, karachi, delhi, bucharest, lagos, tokyo, bogota, riyadh, wellington, sophia, orlando];

//Chooses a random city
function setRandomLocation() {
    citySearch = locationArray[Math.floor(Math.random() * locationArray.length)];
}

//Searches Youtube by keyword and chooses a random location
function youtubeSearch (searchTerm){
    //set random location
    setRandomLocation();

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
            //console.log(response);
            console.log("item 1", response.items[0].snippet);

            videoId = response.items[0].id.videoId;

            getVideoDetails(videoId);
        })
}

function getVideoDetails(id) {

    var videoQuery = "https://www.googleapis.com/youtube/v3/videos?part=snippet,recordingDetails&id=" + id + "&key=AIzaSyCTNUZm5iZT1W_OICKJCKFqFWrLr3bZNjM";

    $.ajax({
        url: videoQuery,
        method: "GET"
    })

        .done(function (response){
            city.lat = response.items[0].recordingDetails.location.latitude;
            city.lng = response.items[0].recordingDetails.location.longitude;
        });

    //playVideo(videoId);
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(){

    player = new YT.Player('player', {
        width: '640',
        height: '390',
        videoId: videoId,
        playerVars: {'autoplay': 1, 'controls': 0, 'showinfo': 0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    //onYouTubeIframAPIReady()
}

function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED) {
        player.destroy();
        $('#head').css({"background-color":"#aaa"});
    }
}

//Where the map is viewed when page loads 
var startDisp = {lat: 0, lng: 0};

var long;
var lad;
var marker;
var randomMarker;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        //Zooms in or out on the map
        zoom: 2,
        //Displays map starting at certain location
        center: startDisp,

    });

    // When area on map is clicked......
    google.maps.event.addListener(map,'click',function(event) {
        //Displays marker on map depending on users longitude/latitude
        randomMarker = new google.maps.Marker({
            //Puts marker at location basec on "randomLongLat" value
            position: city,
            map: map,
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
    });
}
//Function to create marker
function placeMarkerAndPanTo(latLng, map) {
    marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}
