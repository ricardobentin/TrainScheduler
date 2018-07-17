// Code to initialize Firebase
var config = {
    apiKey: "AIzaSyCiI8Xi-Bll8NtBuUZxdVasZwKrnkJVG98",
    authDomain: "trainscheduler-86852.firebaseapp.com",
    databaseURL: "https://trainscheduler-86852.firebaseio.com",
    projectId: "trainscheduler-86852",
    storageBucket: "trainscheduler-86852.appspot.com",
    messagingSenderId: "933170338236"
};
firebase.initializeApp(config);
//create a variable called database to be a reference to the firesbase.database object
var database = firebase.database();
//google authentication
function login() {
    function newLogin(user) {
        if (user) {
            //login happened
            console.log("Sign In Successful")
            app(user);
        }
        else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }

    }
    firebase.auth().onAuthStateChanged(newLogin);
}
//function to log a user out
$("#logout").on("click", function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign Out Successful");
    }).catch(function (error) {
        // An error happened.
        console.log("ERROR: Sign Out Failed");
    });
});
function app(user) {
    //write username to the jumbotron
    $("#userName").text(user.displayName);
    //declare all variables with blank values
    var trainName = "";
    var trainDestination = "";
    var firstTrainTime = "";
    var trainFrequency = "";
    //click event handler for when the add train button is clicked
    $("#add-train-btn").on("click", function () {
        //prevent page refresh on click
        event.preventDefault();
        //grab the values from the input boxes and place assign them to the variables
        trainName = $("#train-name-input").val().trim();
        trainDestination = $("#destination-input").val().trim();
        firstTrainTime = $("#time-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();
        //updated the firebase database with the variable values
        database.ref().push({
            Train: trainName,
            Destination: trainDestination,
            First_Departure: firstTrainTime,
            Frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        console.log(database);
        //clear the inut boxes so that the user can add new train information
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        console.log("train name: ", trainName);
        console.log("destination: ", trainDestination);
        console.log("first train time: ", firstTrainTime);
        console.log("train frequency: ", firstTrainTime);

    });
    //firebase listener for when a child is added to "take a snapshot" and show the relevant information on the page
    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();
        //logic for getting next arrival and minutes away
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(sv.First_Departure, "HH:mm").subtract(1, "years");
        console.log("First Time Converted: " + firstTimeConverted);
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % sv.Frequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = sv.Frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
        //jquery selector on tbody to append the table rows with data to fill in the train schedule information
        $("tbody").append(`<tr> <td>${sv.Train}</td><td>${sv.Destination}</td><td>${sv.Frequency}</td><td>${moment(nextTrain).format("HH:mm")}</td><td>${tMinutesTillTrain}</td></tr>`);

    });
    //adding formatted current time to jumbotron to update every second
    function updateTime() {
        setInterval(showTime, 1000);
    }
    function showTime() {
        $("#currentTime").text(moment().format("HH:mm:ss"));
    }
    //call updateTime function to display the current time every second
    updateTime();
};
window.onload = login;