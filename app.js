//Select DOM
const goButton = document.querySelector(".go-button");
const timer = document.querySelector(".timer");
const todoInput = document.querySelector(".todo-input");

//Event Listeners
goButton.addEventListener("click", clickGo);
document.addEventListener("DOMContentLoaded", showList);


//Functions
function clickGo(e) {
    e.preventDefault();
    
    document.getElementById("hours").innerHTML = "Get Ready..." 
    document.getElementById("mins").innerHTML = ""
    document.getElementById("secs").innerHTML = ""
    
    var clickDate = new Date().getTime();
    // Run myfunc every second
    var myfunc = setInterval(function() {
        
        var now = new Date().getTime();
        var timeleft = now - clickDate;
        // Calculating the days, hours, minutes and seconds left
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
        // Access DOM every second
        document.getElementById("hours").innerHTML = hours + "h " 
        document.getElementById("mins").innerHTML = minutes + "m " 
        document.getElementById("secs").innerHTML = seconds + "s " 
        
        // Every second always check, is it already timeout? if it is then show message & play audio
        if (timeleft > 1000*60*25) {
            clearInterval(myfunc);
            document.getElementById("hours").innerHTML = "One Pomodoro!" 
            document.getElementById("mins").innerHTML = ""
            document.getElementById("secs").innerHTML = ""
            // play audio 
            function playAudio() {
                var audio = new Audio('myaudio.mp3');
                audio.play();    
            }
            playAudio();    
        }
    }, 1000);
 
    // SAVE TO LOCAL 
    saveToLocal(todoInput.value);

    // CREATE HISTORY LIST
    const newDiv = document.createElement("div");
    newDiv.classList.add("history-group","col-lg-4","offset-lg-4");
    const newButton = document.createElement("button");
    newButton.classList.add("btn","btn-default","btn-block","btn-md","btn-primary","done-task"); 
    newButton.innerText = todoInput.value;
    todoInput.value = "";
    newDiv.appendChild(newButton);
    const doneContainer = document.getElementById("done-container");
    doneContainer.appendChild(newDiv);

    


} 


function showList() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const newDiv = document.createElement("div");
    newDiv.classList.add("history-group","col-lg-4","offset-lg-4");
    const newButton = document.createElement("button");
    newButton.classList.add("btn","btn-default","btn-block","btn-md","btn-primary","done-task"); 
    newButton.innerText = todo;
    newDiv.appendChild(newButton);
    const doneContainer = document.getElementById("done-container");
    doneContainer.appendChild(newDiv);

  });
}



        // Another way to create sound 
        // var audioElement = new Audio('car_horn.wav');
        // audioElement.addEventListener('loadeddata', () => {
            // let duration = audioElement.duration;
            // The duration variable now holds the duration (in seconds) of the audio clip
            // })


function saveToLocal(data) {
  let todos;
  if (localStorage.getItem("todos") === null) {
      todos = [];
  } else {
      console.log(todos)
      todos = JSON.parse(localStorage.getItem("todos"));
      console.log(todos);
  }
  todos.push(data);
  localStorage.setItem("todos", JSON.stringify(todos));
}


// Make Web SQL DB
    
var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE foo (id unique, text)');
});

// var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
// db.transaction(function (tx) {
//   tx.executeSql('CREATE TABLE foo (id unique, text)');
// });