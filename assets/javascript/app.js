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