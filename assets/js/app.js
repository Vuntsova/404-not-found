//Where the map is viewed when page loads 
var startDisp = {lat: 0, lng: 0};

var long;
var lad;
var marker;
var randomMarker;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//longtitude/latitude pick
var randomLongLat = {lat: -11.996338, lng: -51.187499};


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
          position: randomLongLat,
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
		  var latLngA = new google.maps.LatLng(31.640625, 7.013665265428443);
   		  				//Saves click location to latLngB
   		  var latLngB = new google.maps.LatLng(longitude,laditude);
      	  //Returns the distance of two points in miles
      	  	var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB)/(1000 *  0.6214); 
      	  //Testing
      	  console.log('Distance between two points: ' + Math.round(distance) + ' miles');
      	  //Draws Line
      	 var line = new google.maps.Polyline({
		    path: [
		  			new google.maps.LatLng(randomLongLat), 
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