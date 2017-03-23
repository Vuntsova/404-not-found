var userName;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXDYThOZ40w_73kgIsACKsv8_4fqOFl-w",
    authDomain: "video-game-2a8aa.firebaseapp.com",
    databaseURL: "https://video-game-2a8aa.firebaseio.com",
    storageBucket: "video-game-2a8aa.appspot.com",
    messagingSenderId: "714221763835"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// // connectionsRef references a specific location in our database
// // All of our connections will be stored in this directory
// var connectionsRef = database.ref("/connections");
//
// // '.info/connected' is a special location provided by Firebase that is updated
// // every time the client's connection state changes.
// // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
// var connectedRef = database.ref(".info/connected");
//
// // When the client's connection state changes...
// connectedRef.on("value", function(snap) {
//
// // If they are connected..
// if (snap.val()) {
//
//     // Add user to the connections list.
//     var con = connectionsRef.push(true);
//     // Remove user from the connection list when they disconnect.
//     con.onDisconnect().remove();
//     }
// });
//
// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snap) {
//
//     // Display the viewer count in the html.
//     // The number of online users is the number of children in the connections list.
//     $("#currPlayers").html(snap.numChildren());
// });

// Initial Values
var initialPlayer = "";
var initialScore= 0;
var highScore = initialScore;
var highUser = initialPlayer;

// At the initial load, get a snapshot of the current data.
database.ref("/playerData").on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highUser").exists() && snapshot.child("highScore").exists()) {

        // Set the initial variables for highBidder equal to the stored values.
        highUser = snapshot.val().highBidder;
        highScore = parseInt(snapshot.val().highPrice);

        // Print the initial data to the console.
        console.log(snapshot.val().highUser);
        console.log(snapshot.val().highScore);
    }
    //Keep the initial variables for highest user equal to the initial values
    else {

        // Code to update the leaderboard here?!
        // $("").html(highUser);
        // $("").html(highScore);
        // Print the initial data to the console.
        // console.log("Current Highest User");
        // console.log(highUser);
        // console.log(highScore);
    }

    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});


// Whenever user clicks the Play Now button
$("#playBtn").on("click", function(event) {
    event.preventDefault();

    //Get the input value
    userName = $("#username").val().trim();
    //var score = userScore;

    // log the player username
    console.log("Your username is: " + userName);


    // Code for pushing to db
    // database.ref().push(players);
});

function pushtoFirebase() {

    // Save the new username in Firebase
    database.ref("/playerData").push({
        player_name: userName,
        user_score: userScore,
        date_Added: firebase.database.ServerValue.TIMESTAMP
    });
}

// // Firebase watcher + initial loader
database.ref("/playerData").on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());

    var newUser = childSnapshot.val().player_name;
    var newScore = childSnapshot.val().user_score;

    newUserObject = {
        name: newUser,
        score: newScore
    };

    console.log("newUser", newUser);
    console.log("newScore", newScore);

    players.push(newUserObject);
    console.log(players);
    leaderBoard();

    //$("#leader-board > tbody").append("<tr><td>" + userName + "</td><td" + email);
}, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

