function carOptions(action){
    var car;
    switch (action){
        case "openTheCar":
        car = "Switch on the car with remote";
        break;

        case "DriveTheCar":
        car = "Switch on the ignition with your key";
        break;

        case "moveNow":
        car = "Bring down the brakes of the car and move now!!!!";
        break;

        case "speed":
        car = "";
        break;

        default:
        car = "What do you wanna do pls?";
    }
    return car;
}



//tenary tryings...
var age = document.getElementById("userAge");
var button = document.getElementById("btn");
var par = document.getElementById("po");


function checkInputAge(){
    voteAge = (age.value > 18) ? "You can vote" : "Do not smell the poll units";
    par.innerHTML = voteAge;
}

button.addEventListener("click", checkInputAge);


