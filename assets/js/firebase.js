// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXDYThOZ40w_73kgIsACKsv8_4fqOFl-w",
    authDomain: "video-game-2a8aa.firebaseapp.com",
    databaseURL: "https://video-game-2a8aa.firebaseio.com",
    storageBucket: "video-game-2a8aa.appspot.com",
    messagingSenderId: "714221763835"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var username = "";
var score = 0;

// Caputure Submit Click
$("#playBtn").on("click", function() {
    event.preventDefault();

    //Code in the logic for storing and retrieving the most recent user
    var userName = $("#username").val().trim();
    // var score -- need to figure it out


    // Create a new object and push into db
    var players = {
        username: userName,
        //score: score
    }

    // Code for pushing to db
    if (userName != "" ) {
        database.ref().push(players);
    } else {
        alert("Please enter train data");
    }


    // Clear out form fields
    $("#username").val("");

    console.log("Username: " + players.username);
    //console.log("Score: " + players.score);


});

// Firebase watcher + initial loader
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());

    var userName = childSnapshot.val().username;
    //var score = childSnapshot.val().score;

    //$("#leader-board > tbody").append("<tr><td>" + userName + "</td><td" + email);
}, function(errorObject){
    console.log("Errors handled: " + errorObject.code);

