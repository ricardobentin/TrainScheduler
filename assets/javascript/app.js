// Initialize Firebase
var config = {
    apiKey: "AIzaSyCiI8Xi-Bll8NtBuUZxdVasZwKrnkJVG98",
    authDomain: "trainscheduler-86852.firebaseapp.com",
    databaseURL: "https://trainscheduler-86852.firebaseio.com",
    projectId: "trainscheduler-86852",
    storageBucket: "trainscheduler-86852.appspot.com",
    messagingSenderId: "933170338236"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDestination = "";
var firstTrainTime = "";
var trainFrequency = "";


$("#add-train-btn").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();

    trainFrequency = $("#frequency-input").val().trim();

    database.ref().push({
        Train: trainName,
        Destination: trainDestination,
        First_Departure: firstTrainTime,
        Frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(database);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    console.log("train name: ",trainName);
    console.log("destination: ",trainDestination);
    console.log("first train time: ",firstTrainTime);
    console.log("train frequency: ",firstTrainTime);

});

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
    $("tbody").append(`<tr> <td>${sv.Train}</td><td>${sv.Destination}</td><td>${sv.Frequency}</td><td>${moment(nextTrain).format("HH:mm")}</td><td>${tMinutesTillTrain}</td></tr>`);
})
