"use strict";

const resturant = {
  names: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thus: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },
  //enhanced ES6 object literals
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //   order: function (starterIndex, mainIndex) {
  //     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  //   },

  orderDelivery({ starterIndex, time, address, mainIndex }) {
    // console.log(
    //   `Order Delivered! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${address} by ${time}`
    // );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Your favourite pasta😋 is a combination of ${ing1}, ${ing2} and ${ing3}`
    );
  },
};

resturant.orderDelivery({
  //   time: "2:30pm",
  //   address: "Via Angelo Tavanti 23,",
  //   starterIndex: 3,
  //   mainIndex: 1,
});
///////// MAps

///////// sets
/*
const orderSet = new Set(["Pizza", "Rosoto", "Pizza", "Pasta", "Rosoto"]);
console.log(orderSet);

console.log(new Set("Jonas"));
console.log(orderSet.has("Rice"));
console.log(orderSet.has("Pasta"));
orderSet.add("Garlic Bread");
orderSet.add("Garlic Bread");
console.log(orderSet);
console.log(orderSet.size);
orderSet.delete("Pasta");
console.log(orderSet);

for (let food of orderSet) {
  console.log(food);
}
//Eg
const staff = ["Waiter", "Chef", "Manager", "Waiter", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/

//////looping over objects
/*
const entries = Object.entries(resturant.openingHours);
//entries contains [number, value]
// console.log(entries);
for (const [key, { open, close }] of entries)
  console.log(`We open by ${open}am and end by ${close}pm`);
const prop = Object.keys(resturant.openingHours);
for (const day of prop) console.log(day);

let str = `We open on ${prop.length} days which includes: `;
for (const days of prop) {
  str += `${days},`;
}
console.log(str);
*/

/////////optional chaining((?)check if a particular data exist or not, it returns undefined. it hepls to find bugs)
/*
console.log(resturant.openingHours.mon?.close);
console.log(resturant.openingHours?.mon?.close);
//method
console.log(resturant.orderPizza?.(2, 0) ?? "Method does not exist!!");
//arrays
const users = [{ names: "Jonas", email: "asimanabarbara@gmail.com" }];
console.log(users[0]?.names ?? "User does not exist");
*/

/////////looping over arrays(for-of loop)
/*
const menu = [...resturant.starterMenu, ...resturant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
*/
// const arr = [2, 3, 5];
//normal way of accessing a value from the array
/*
const a = arr[0];
const b = arr[1];
const c = arr[2];
*/

//destructuring
/*
const [x, y, z] = arr;
console.log(x, y, z);
*/
// const [first, second] = resturant.starterMenu;
// console.log(first, second);

//to get the first and the third item
// const [first, , second] = resturant.starterMenu;
// console.log(first, second);

//switching two items
// let [first, second] = resturant.starterMenu;
// [first, second] = [second, first];
// console.log(first, second);

// const [starter, main] = resturant.order(2, 1);
// console.log(starter, main);

// nested destructuring
/*const nested = [2, 4, [5, 6]];
  const [i, , [j, m]] = nested;
  console.log(i, j, m);
*/

/////default values
/*const [p, q, r] = [8, 4];
  console.log(p, q, r);
  const [p = 1, q = 1, r = 1] = [8, 4];
  console.log(p, q, r);
*/

/*
//// destructuring an objects
const { names, openingHours, categories } = resturant;
console.log(names, openingHours, categories);

// mutating variables
let a = 2;
let c = 4;
const obj = { a: 3, b: 5, c: 9 };
({ a, c } = obj);
console.log(a, c);

// Nested Obj
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
*/

/*
//////////// the Spread Operator(...)
const arr = [2, 4, 46, 67];
const grr = [1, ...arr];
// const [] = grr;
console.log(...grr);

/// join 2 arrays
const menu = [...resturant.starterMenu, ...resturant.mainMenu];
console.log(menu);

/// iterables: arrays, strings, maps,sets
const str = "Onyeka";
const letters = [...str];
console.log(letters);
console.log(...str);

const ingredients = [
  //   prompt("Let's make pasta!😋 Ingredient 1?"),
  //   prompt("Ingredient 2?"),
  //   prompt("Ingredient 3?"),
];
resturant.orderPasta(...ingredients);

////obj with spread operator
const newResturant = { ...resturant };
newResturant.names = "Asimana Onyeka";
console.log(newResturant.names);
console.log(resturant.names);
*/

///// Rest Operator(pack the remaining elements back into an array)
/*
const [pizza, , risotto, ...otherFoods] = [
  ...resturant.mainMenu,
  ...resturant.starterMenu,
];
console.log(pizza, risotto, otherFoods);

// obj(rest operator)
const { sat, ...weekdays } = resturant.openingHours;
console.log(weekdays);

// functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  console.log(sum);
};


add(2, 4);
add(2, 23, 4);
add(2, 4, 43, 57, 7, 8);
*/

///// short circuiting

//and short circuiting(returns a truthy value and short circuits,also returns a falsy if found)
/*
console.log("hello" && "null");
resturant.orderPasta && resturant.orderPasta("cheese", "pepperoni", "beef");

// OR short circuiting
console.log("Hello" || "null");
*/

///// nullish values(it includes only 0 and "")
/*
resturant.getNumOfGuests = 0;
const guests = resturant.getNumOfGuests ?? 10;
console.log(guests);
*/

/////// Challenge 1 🧠
/*
const game = {
  team1: "Bayern Munich",
  team2: "Chelsea United",
  players: [
    [
      "R. Hoffmann",
      "D. Alaba",
      "T. Nianzou",
      "J. Boateng",
      "A. Davies",
      "B. Pavard",
      "B. Sarr",
      "J. Kimmich",
      "C. Tolisso",
      "T. Dantas",
      "J. Musiala",
    ],

    [
      "Kepa A.",
      "Antonia R.",
      "Marcos Alonso",
      "A. Christensen",
      "Thiago Silvia",
      "Kurt Z.",
      "B. Chilwell",
      "Reece James",
      "C. Azpilicueta",
      "Emerson",
      "Mateo Kovacic",
    ],
  ],
  date: "19th June, 2021",
  odds: {
    team1: 4.33,
    draw: 3.23,
    team2: 2.44,
  },
  scored: ["Davies", "Muller", "Lewandowski", "Kimmich"],
  printGoals: function () {
    console.log(
      `All these persons which includes: ${this.scored} scored a total of ${this.scored.length} goals`
    );
  },
};

//task 1

const [player1, player2] = game.players;
console.log(player1);
// console.log(player2);

//task 2
const [gk, ...others] = player1;
// console.log(gk, others);

// task 3
const allPlayers = [...player1, ...player2];
// console.log(allPlayers);

//task 4
const players1Final = [...player1, "Thiago", "Coutinho", "Perisic"];
// console.log(players1Final);

//task 5
const { team1, draw, team2 } = game.odds;
console.log(team1, draw, team2);
//task 6
game.printGoals();

//task 7
team1 < team2 && console.log(`Team 1 is likely to win`);
team1 > team2 && console.log(`Team 2 is likely to win`);
*/

////////// Challenge 2 🧨//
/*
const game = {
  team1: "Bayern Munich",
  team2: "Chelsea United",
  players: [
    [
      "R. Hoffmann",
      "D. Alaba",
      "T. Nianzou",
      "J. Boateng",
      "A. Davies",
      "B. Pavard",
      "B. Sarr",
      "J. Kimmich",
      "C. Tolisso",
      "T. Dantas",
      "J. Musiala",
    ],

    [
      "Kepa A.",
      "Antonia R.",
      "Marcos Alonso",
      "A. Christensen",
      "Thiago Silvia",
      "Kurt Z.",
      "B. Chilwell",
      "Reece James",
      "C. Azpilicueta",
      "Emerson",
      "Mateo Kovacic",
    ],
  ],
  date: "19th June, 2021",
  odds: {
    team1: 4.33,
    x: 3.23,
    team2: 2.44,
  },
  scorers: {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2,
  },
  scored: ["Davies", "Muller", "Lewandowski", "Kimmich"],
  printGoals: function () {
    console.log(
      `All these persons which includes: ${this.scored} scored a total of ${this.scored.length} goals`
    );
  },
};
//task 1
for (const [num, players] of game.scored.entries()) {
  console.log(`Goal ${num + 1}: ${players}`);
}

//task 2
function avg() {
  let sum = 0;
  let average;
  let odds = Object.values(game.odds);
  // console.log(odds);
  for (const num of odds) {
    sum += num;
    average = sum / odds.length;
  }
  // sum /= odds.length;
  // console.log(`${average ?? "not found"}`);
  return average;
}
console.log(avg());

// task 3
const odds = Object.entries(game.odds);
console.log(odds);
for (const [team, oddNum] of odds) {
  //   console.log(`Odd of victory Bayern Munich: $
  // {oddNum}`);
  const teamStr = team === "x" ? `draw` : `victory ${game[team]}`;
  // console.log(team, oddNum);
  console.log(`Odd of ${teamStr} ${oddNum}`);
}
*/

const menu = [...resturant.starterMenu, ...resturant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
