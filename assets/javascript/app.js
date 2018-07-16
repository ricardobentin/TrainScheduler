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
var now = moment();
console.log(now);

var trainName = "";
var trainDestination = "";
var firstTrainTime = "";
var trainFrequency = "";


$("#add-train-btn").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    console.log(trainName);
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    console.log(firstTrainTime);
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
});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    $("tbody").append(`<tr> <td>${sv.Train}</td><td>${sv.Destination}</td><td>${sv.Frequency}</td><td>"Next Arrival"</td><td>"Minutes Away"</td></tr>`);
})
