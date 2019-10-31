// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyByzoaAbK4cJfAooeY1te64D29-HyrQXec",
  authDomain: "train-project-113fd.firebaseapp.com",
  databaseURL: "https://train-project-113fd.firebaseio.com",
  projectId: "train-project-113fd",
  storageBucket: "train-project-113fd.appspot.com",
  messagingSenderId: "835206838342",
  appId: "1:835206838342:web:484e562ca3c9b68e573247",
  measurementId: "G-80RZ8N5EMY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

var trainName = $("#trainName")
  .val()
  .trim();
var trainDestination = $("#trainDestination")
  .val()
  .trim();
var trainFirstTime = $("#trainFirstTime")
  .val()
  .trim();
var trainFrequency = $("#trainFrequency")
  .val()
  .trim();

//Moment JS conversions

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainName")
    .val()
    .trim();

  trainDestination = $("#trainDestination")
    .val()
    .trim();

  trainFirstTime = $("#trainFirstTime")
    .val()
    .trim();

  trainFrequency = $("#trainFrequency")
    .val()
    .trim();

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  //Minutes Away

  db.ref().push({
    Name: trainName,
    Destination: trainDestination,
    FirstTime: trainFirstTime,
    Frequency: trainFrequency

    //   ConvertedTime: firstTimeConverted,
    //   CurrentTime: currentTime,
    //   DiffTime: diffTime,
    //   TrainRemainder: tRemainder,
    //   UntilNextTrain: tMinutesTillTrain,
    //   NextTrain: nextTrain
  });

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainFirstTime").val("");
  $("#trainFrequency").val("");
});
db.ref().on("child_added", function(snapshot) {
  var trainName = snapshot.child("Name").val();
  var trainDestination = snapshot.child("Destination").val();
  var trainFirstTime = snapshot.child("FirstTime").val();
  var trainFrequency = snapshot.child("Frequency").val();

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newTrainAdded = `<tr>
                    <td id="rowName">${trainName}</td>
                    <td id="rowDestination">${trainDestination}</td>
                    <td id="rowFrequency">${trainFrequency}</td>
                    <td id="rowArrival">${moment(nextTrain).format(
                      "hh:mm A"
                    )}</td>
                    <td id="rowMinutes">${tMinutesTillTrain}</td>
                      </tr>`;

  $("#trainBody").append(newTrainAdded);
});
