"use strict";

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAge(1990);

// const Joan = {
//   fname: "Barbara",
//   year: 1992,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };

// Joan.calcAge();
console.log("undefined");
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products are deleted!");
}

// this isn't a code block but an object literal,it literally defines an object!!
const Joan = {
  fname: "Barbara",
  year: 1992,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);
  },
  greet: function () {
    //so it gets its this keyword from the global scope which  is window objct
    // console.log(this);
    console.log(`Hey ${this.fname}`);
  }, // never use an arrow function as a method
};

Joan.greet();
