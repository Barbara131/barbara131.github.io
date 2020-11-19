var user = {
    username: "Barbs" , 
    password: "akeyno2000"
 };
var database = [
    {
        username: "Barbs" , 
        password: "akeyno2000"
    }
];
var newsFeed = [
    {
        username:"tammy3", 
        timeline: "Val its very boring!!"
    },
    {
        username:"Vish" , 
        timeline: "Wow, its blowing my mind!"
    },

    {
        username: "Precious" , 
        timeline: "Lets go on, its very interesting"
    }
];
var name = prompt("Enter your name");
var pass = prompt("Enter password");


function signIn(username, password){
    if(username === database[0].username && password === database[0].password){
        alert("You are logged in");
    }
    else{
        alert("Incorrect username and password");
    }

}

signIn(name, pass);