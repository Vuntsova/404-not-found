var city;
var locationArray = [];

$().ready(function () {
    youtubeSearch("wrestling");
});


var shanghai = {
    lat: "31.230416",
    long: "121.473701"
},

karachi = {
    lat: "24.861462",
    long: "67.009939"
},

delhi = {
    lat: "28.661898",
    long: "77.227396"
};
    bucharest = {
    lat: "44.426767",
    long: "26.102538"
},
    lagos = {
        lat: "6.524379",
        long: "3.379206"
},
    tokyo = {
        lat: "35.689488",
        long: "139.691706"
},
    bogota = {
    lat: "4.710989",
    long: "-74.072092"
},
    riyadh = {
        lat: "24.713552",
        long: "46.675296"
},
    wellington = {
        lat: "-41.28646",
        long: "174.776236"
},
    sophia = {
        lat: "42.6977081999",
        long: "23.3218675000"
}

    orlando = {
        lat: "28.538336",
        long: "-81.379236"
    };

locationArray = [shanghai, karachi, delhi, bucharest, lagos, tokyo, bogota, riyadh, wellington, sophia, orlando];

function setRandomLocation() {
    city = locationArray[Math.floor(Math.random() * locationArray.length)];
}

function youtubeSearch (searchTerm){
    //set random location
    setRandomLocation();

    console.log("city", city);
    console.log(city.lat, city.long);

    //var query = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=hockey&location=21.5922529,-158.1147114&locationRadius=10mi&videoEmbeddable=true&type=video&key=AIzaSyCTNUZm5iZT1W_OICKJCKFqFWrLr3bZNjM";

    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
    var q = "&q=" + searchTerm;
    var locationQ = "&location=" + city.lat + "," + city.long;
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