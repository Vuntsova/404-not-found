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

// Whenever user clicks the Play Now button
$("#playBtn").on("click", function(event) {
    event.preventDefault();

    //Get the input value
    userName = $("#username").val().trim();

    // log the player username
    console.log("Your username is: " + userName);

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

    //Get Player Names / Scores
    var newUser = childSnapshot.val().player_name;
    var newScore = childSnapshot.val().user_score;

    newUserObject = {
        name: newUser,
        score: newScore
    };

    players.push(newUserObject);

}, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

