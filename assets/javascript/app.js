$(document).ready(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDhjMztS8ytFG-FcTZqQKgAuxf9O3e_u40",
      authDomain: "train-schedule-16ed0.firebaseapp.com",
      databaseURL: "https://train-schedule-16ed0.firebaseio.com",
      projectId: "train-schedule-16ed0",
      storageBucket: "train-schedule-16ed0.appspot.com",
      messagingSenderId: "670118941546"
    };
    firebase.initializeApp(config);


//variable to reference database
var database = firebase.database();

//initial variables
var name = "";
var destination = "";
var firstTrain = "";
var frequency = ""; 

//button click
$("#addTrain").on("click", function (event) {
  //prevent page reload 
  event.preventDefault();

 trainName = $("#trainName").val().trim();
 destination =  $("#destination").val().trim();
 firstTrain = $("#firstTrainTime").val().trim();
 frequency = $("#frequency").val().trim(); 

var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment(); 
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemaining = diffTime % frequency;
console.log(tRemaining);

var tMinutesTillTrain = frequency - tRemaining;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    
    firstTimeConverted: firstTimeConverted,
    currentTime: currentTime,
    diffTime: diffTime,
    tRemaining: tRemaining,
    tMinutesTillTrain: tMinutesTillTrain,
    nextTrain: nextTrain,

    dateAdded: firebase.database.ServerValue.TIMESTAMP
  }); //database.ref
  

}); //addtrain onclick

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot);
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);


  $("#newTrain").append("<tr><th>" + childSnapshot.val().trainName + "</th><th>" +  childSnapshot.val().destination + "</th><th>" + childSnapshot.val().frequency + "</th><th>" + childSnapshot.val().nextTrain + "</th><th" + childSnapshot.val().tMinutesTillTrain + "</th></tr>");
});//.onChild_added

});


//extra stuff

// var firstTimeConverted = "";
// var currentTime = "";
// var diffTime = "";
// var tRemaining = "";
// var nextArrival = "";
// var minAway = ""
// var nextArrivalFormatted = "";

//   firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
//   currentTime = moment();
//   diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   tRemaining = diffTime % frequency;
//   minAway = frequency - tRemaining;
//   nextArrival = moment().add(minAway, "minutes");
//   nextArrivalFormatted = moment(nextArrival).format("hh:mm");

//   console.log(currentTime);
//   console.log(diffTime);
//   console.log(tRemaining);
//   console.log(minAway);
//   console.log(nextArrival);

//   database.ref().push({
//     firstTimeConverted: firstTimeConverted,
//     currentTime: currentTime,
//     diffTime: diffTime,
//     tRemaining: tRemaining,
//     nextArrival: nextArrival, 
//     minAway: minAway,
//     nextArrivalFormatted: nextArrivalFormatted 
//   });//database.ref



