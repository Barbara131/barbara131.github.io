// var w = {name: "Marvin", Password:"enivid2000"};
// var x = {name: "Jax", Password:"blablabla"};
// console.log(y[0].fruits);

var loginDetails = [
                        {name: "Ma", Password:"en0"}, 
                        {name: "Marvin", Password:"enivid2000"}, 
                        {name: "Jax", Password:"blablabla"}
                    ];


function confirmLogin(){
    var username =  document.getElementById("Uname").value;
    var Password =  document.getElementById("passwd").value;
    var correctName = false;
    var correctPassword = false;
    for(i = 0; i < loginDetails.length; i++)
    {
        
       if (loginDetails[i].name === username)
       {
           
            correctName = true;

           if(loginDetails[i].Password === Password){

            correctPassword = true;
            break;// to break out of the loop when the password is correct..
           }
           break;// to break out of the loop when password is incorrect..
       }

    }
    if (correctName && correctPassword == true){
         var heading = document.createElement("h1");
         heading.innerHTML = "You are logged in";
         document.body.innerHTML = "";
         document.body.appendChild(heading);
    }
    else{
        var heading = document.createElement("h1");
        heading.innerHTML = "Check password or username!!";
        document.body.innerHTML = "";
        document.body.appendChild(heading);
    }
    // console.log(username, Password);
}


window.onload = function(){
    document.getElementById("Uname").innerHTML = "Hello";
    document.getElementsByTagName("button")[0].innerHTML = "Sign-in";
    document.getElementsByTagName("button")[0].addEventListener("click", confirmLogin, false);
    document.getElementById("Uname").value = "Hello";

};
