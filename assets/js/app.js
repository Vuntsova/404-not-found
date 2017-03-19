
var city;
var locationArray = [];

$().ready(function () {
    youtubeSearch("wrestling");
});


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

locationArray = [shanghai, karachi, delhi, bucharest, lagos, tokyo, bogota, riyadh, wellington, sophia, orlando];

function setRandomLocation() {
    city = locationArray[Math.floor(Math.random() * locationArray.length)];
}

function youtubeSearch (searchTerm){
    //set random location
    setRandomLocation();

    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
    var q = "&q=" + searchTerm;
    var locationQ = "&location=" + city.lat + "," + city.lng;
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

            var videoId = response.items[0].id.videoId;

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

            console.log(response);
            //location = response.
        })
}

//Where the map is viewed when page loads 
var startDisp = {lat: 0, lng: 0};

var long;
var lad;
var marker;
var randomMarker;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

//Model box
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        //Zooms in or out on the map
        zoom: 1,
        //Displays map starting at certain location
        center: startDisp,
         styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}]
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


        //Model Box
        //========================================================
        // When the user clicks on the button, open the modal 
            var latInfo = city.lat;
            var longInfo = city.lng;
            $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latInfo + ',' + longInfo + '&sensor=true',
                method: 'GET'
            }).done(function(response){
                $('.modelText').html('The area is ' + response['results'][0]['formatted_address'] +
                                      'and you were ' + Math.round(distance) + ' miles off');
                //Testing
                console.log('The area is ' + response['results'][0]['formatted_address']);
            });
            modal.style.display = "block";


        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            nextQuestion();
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                nextQuestion();
            }
        }
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
    city = locationArray[Math.floor(Math.random() * locationArray.length)];
    initMap();
}




