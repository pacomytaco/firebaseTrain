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


  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  }); //database.ref
  

}); //addtrain onclick

database.ref().on("child_added", function(childSnapshot) {

  
  var showTrainName = childSnapshot.val().trainName
  var showFrequency = childSnapshot.val().frequency
  var showNextTrain = childSnapshot.val().nextTrain
  var showTMinutesTillTrain = childSnapshot.val().tMinutesTillTrain
  var showFirstTrain = childSnapshot.val().firstTrain

  var firstTimeConverted = moment(showFirstTrain, "HH:mm").subtract(1, "years");
  
  
  var currentTime = moment(); 
  
  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
 
  
  var tRemaining = diffTime % showFrequency;
  
  
  var tMinutesTillTrain = showFrequency - tRemaining;
  
  
  var nextTrain = moment().add(showTMinutesTillTrain, "minutes");
  
  


  $("#newTrain").append("<tr><th>" + childSnapshot.val().trainName + "</th><th>" +  childSnapshot.val().destination + "</th><th>" + childSnapshot.val().frequency + "</th><th>" + moment(nextTrain).format("hh:mm") + "</th><th>" + tMinutesTillTrain + "</th></tr>");
});//.onChild_added

});





