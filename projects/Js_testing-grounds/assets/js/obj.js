var cars = {name: "Matrix", color: "blue"};
 console.log(cars.name);
 console.log(cars["color"]);

 var fruits = ["banana", "kiwi", "apples", "paw-paw"];
 console.log(fruits[fruits.length-1]);


 var a = [1, 2, 4, 6, 5];
 var b = a.reduce(function (x, y) {return x + y})
 var c = a.reduce(function (x, y) {return x * y})
 var d = a.reduce(function(x, y){
     return x + y;
 });
 console.log(d);

 var s = [5, 4, 3, 2, 1];
// smallvalues = a.filter(function(x) { return x < 3 }); // [2, 1]
everyother = s.filter(function(x, y) { return y%2==0 });
console.log(everyother);

// How to declare a function as well as invoke it...
var a = [function(x) { return x*x; }, 20]; // An array literal
a[0](a[1]);

var operation = [function(a, b) {return a + b}, function(a, b) {return a * b}];

var operators = {
    add: function(x,y) { return x+y; },
    subtract: function(x,y) { return x-y; },
    multiply: function(x,y) { return x*y; },
    divide: function(x,y) { return x/y; },
    pow: Math.pow // Works for predefined functions too
    };
//  var num = [];

var s = "abcdefg";
// undefined
// s.slice(-3, -1)
// "ef"
// s.slice(-4, 0)
// ""
// s.slice(-6, -4)
// "bc"
// s.split("")
// (7) ["a", "b", "c", "d", "e", "f", "g"]
// s.split("", 7)
// (7) ["a", "b", "c", "d", "e", "f", "g"]
// s.split("", 4)
// (4) ["a", "b", "c", "d"]


var getLongestWord = function(){
    
    var str = "I am the most fabulous magnificient person in the wholeWideWorld cheeii";
    var word = str.split(" ");
    var newLet;
    for(i = 0; i < word.length; i++){
    if (word[i].length > word.length){
        newLet = word[i].length;
    }
}
    return newLet;
};

console.log(getLongestWord());

//repeat a string
var repeatString = function(str, num){
    return (num > 0 ? str.repeat(num) : "")
}
console.log(repeatString("Asimana Onyeka", 5));
console.log(repeatString("Barbara Onyeka", 2));

// 1..Returning numbers from 1-255 in an array
 function getNum(){
     var num = new Array();

     for(i = 1 ; i <= 255 ; i++){
        num[i] = i;
     }
     return num;
 }

 getNum();


// 2.. Returning the largest numbers from an array 
