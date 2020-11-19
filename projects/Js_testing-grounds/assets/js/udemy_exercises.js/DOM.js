// document.getElementsByClassName//it locates the root and the access the the element with classname and outputs it.. it differs from id cos its uses the plural of element(s)cos there are so many clssname.
// document.getElementsByTagName// just get elements with a particular tag.
// document.getElementById//just id's
// document.querySelector//it just get the elements
// document.querySelectorAll//gets all elements with a that particular tagname..


// var rand = document.querySelector("li");//u have to target the selector b4 getting the attribute.
// rand.getAttribute("random");// get the attributes 
// rand.setAttribute("random", "any num u want")// changes the attribute's value


var button = document.getElementById("btn");
var input = document.getElementById("usertxt");
var ul = document.querySelector("ul")

function inputValue(){
    return input.value.length;
}

function createListElement(){
    var li = document.createElement("li");
    var text = document.createTextNode(input.value);
    li.appendChild(text);
    ul.appendChild(li);
    input.value = "";
}

function addEventClick(){
    if( inputValue() > 0){     
        createListElement();
    }
}

function addEventForKeypress(Event){
    if(inputValue() > 0 && Event.key === "Enter")
    {     
        createListElement();
    }
}

button.addEventListener("click", addEventClick);

input.addEventListener("keypress", addEventForKeypress);

