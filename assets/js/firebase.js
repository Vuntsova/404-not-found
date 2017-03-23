// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXDYThOZ40w_73kgIsACKsv8_4fqOFl-w",
    authDomain: "video-game-2a8aa.firebaseapp.com",
    databaseURL: "https://video-game-2a8aa.firebaseio.com",
    storageBucket: "video-game-2a8aa.appspot.com",
    messagingSenderId: "714221763835"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var username = "";
var score = 0;

// Caputure Submit Click
$("#playBtn").on("click", function() {
    event.preventDefault();

    //Code in the logic for storing and retrieving the most recent user
    var userName = $("#username").val().trim();
    var score = userScore;

    // Create a new object and push into db
    var players = {
        player_name: userName,
        user_score: score,
        date_Added: firebase.database.ServerValue.TIMESTAMP
    }

    console.log("Username: " + players.player_name);
    console.log("Score: " + players.user_score);

    // Code for pushing to db
    database.ref().push(players);
});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());

    var newUser = childSnapshot.val().player_name;
    var newScore = childSnapshot.val().user_score;

    //$("#leader-board > tbody").append("<tr><td>" + userName + "</td><td" + email);
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

