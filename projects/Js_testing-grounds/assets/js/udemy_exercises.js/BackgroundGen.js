var color = document.querySelector(".color");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

function bodyBackChange(){
    body.style.background = "linear-gradient(to right," + color.value + " , " + color2.value ;")";
}

color.addEventListener("input", bodyBackChange);

color2.addEventListener("input", bodyBackChange);
