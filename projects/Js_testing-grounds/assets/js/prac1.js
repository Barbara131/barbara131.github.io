// var bottles;
// var remain = 9

// while ( remain > 0){
//     console.log( remain + " " + "beer bottle" + check(remain) +"sitting on a wall " + " <br>");
//     console.log( remain + " " + "beer bottle" + check(remain) +"sitting on a wall " + " <br>");
//     remain--;
//     console.log( "There'll be " + remain + " " + "beer bottle" + check(remain) +"sitting on a wall !! " + " <br>");
 
//     if( remain == 1 ){
//         console.log( "1 bottle remaining");
//     }
//     if(remain == 0) {
//         console.log( "no more bottle left ");
//     }
// }

// function check(number){
//     return number < 2 ? " " : "s ";
// }

// var firstName = prompt("Enter your first name here:");
// var lastName = prompt("Enter your last Barname:");
// var names = firstName + " " + lastName;
// console.log("This are my names:" + " " + names);

var num1 = prompt("Input the first number");
var num2 = prompt("Input the second number");
var sum = num1 + num2;
var minus = num1 - num2;
var multiply = num1 * num2;
var division = num1 / num2;
console.log("My answer is :")



// values destructred from an array
 var [Game1] = ["softball", "football", "volleyball", "hockey"]
 console.log(Game1)


//  object literal enhancement
 var nameOfSchool = "Holy Rosary Girls' College"
 var grade = "JSS1";
 var details = function() {
     return (`I'm in ${this.nameOfSchool} and in this ${this.grade}`)
 }

 var person = {nameOfSchool, grade, details}

 console.log(person.details())


//  spread operator.. used for diff purposes
var peaks = ["milk", "chocolate", "coffee"]
var crayons = ["green", "purple"]
var together = [...peaks, ...crayons]

console.log(together.join(", "))

// to get the last elements in an array
var fruits = ["kiwi", "orange", "lemon"]
var [last] = fruits.reverse()
console.log(fruits.join(", "))
// lemon, orange, kiwi .. THE RESULTS..

function faculty(...args){
    var [start, ...others] = args
    var [others, ...remaining] = others.reverse()
    console.log(`There are ${args.length} faculties in FUTO`)
    console.log(`You have to be in ${args[1]}`)
    console.log(`Check out this dept: ${others}`)
    console.log(`One needs these ${remaining.length} classes`)
}

faculty(
    "SAAT",
    "SCIT",
    "SMAT",
    "SOHT",
    "SEET"
)