"use strict"; // it forbids us from doing certain things && it creates visible errors in the developer console

// let hasDriversLicense = false
// const passTest = true

// if (passTest) hasDriversLicense = true
// if(hasDriversLicense) console.log("I can now drive")

// function fruitProcessor(apples, oranges){
//     const juice = `Juice made with ${apples} apples and ${oranges} oranges`
//     return juice
// }

// console.log(fruitProcessor(5, 3))
// const appOrangeJuice = fruitProcessor(5, 3) //returns only the value of juice
// console.log(appOrangeJuice)

// function declaration
// function calcAge1(birthYear){
//     return (2025 - birthYear);
// }

// const age1 = calcAge1(2000)

// // function expression
// const calcAge2 = function (birthYear){
//     return (2025 - birthYear)
// }

// const age2 = calcAge2(1993)

// console.log(age1, age2)

///////// calling a function in a function ///////
// function cutFruitPieces(fruits){
//     return fruits * 4;
// }

// function fruitProcessor(apples, oranges){

//     const applePieces = cutFruitPieces(apples)
//     const orangePieces = cutFruitPieces(oranges)

//     const juice = `This juice was made with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`
//     return juice
// }

// console.log(fruitProcessor(2, 4))

//////// Arrow function //////
// const calcAge2 =  birthYear =>  (2025 - birthYear)
// const age2 = calcAge2(2000)
// console.log(age2)

// const age1 = function (birthYear, currYr){
//     return currYr - birthYear
// }

// const retirementYearsLeft = function(birthYear, currYr, firstName) {
//     const age = age1(birthYear, currYr)
//     const yrsLeft = 70 - age
//     const retirement = yrsLeft > 0 ? `${firstName} retires in ${yrsLeft}` : `${firstName} is retired`

//     return retirement
//     // return `${firstName} retires in ${retirement} years`
// }
// console.log(retirementYearsLeft(2000, 2034, "Barbs"))
// console.log(retirementYearsLeft(1960, 2034, "Matt"))

///// 🧠 Challenge 1 🔥 ///

// const calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3

// const avgDolphins = calcAverage(23, 34, 27)
// const avgKoalas = calcAverage(85, 54, 41)

// const checkWinner = (avgDolphins, avgKoalas) => {

//     if (avgDolphins > (2 * avgKoalas)){
//         console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
//     }

//     else if(avgKoalas > (2 * avgDolphins)){
//         console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`)
//     }

//     else{
//         return `No teams wins`
//     }
// }

// checkWinner(avgDolphins, avgKoalas)

// const years = new Array(1993, 2342, 4300)
// console.log(years)

// const calcAge2 = function (birthYear){
//     return (2025 - birthYear)
// }

//  const yrs = [1990, 2000, 2004, 2021]

//  let age1 = calcAge2(yrs[0])
//  let age2 = calcAge2(yrs[2])
//  let age3 = calcAge2(yrs[yrs.length - 1])
//   console.log(age1, age2, age3)

//   const ages = [calcAge2(yrs[0]), calcAge2(yrs[2]), calcAge2(yrs[yrs.length - 1])]
// console.log(ages)

// const friends = ["Michael", "Onyeka", "Peter"]
//array method
// let newLength = friends.push("Jay")// 1 method
// console.log(friends)
// console.log(newLength)

// friends.unshift("John")// 2 method
// console.log(friends)

// let popped = friends.pop();// 3 method(removes the last value in the array and returns it)
// console.log(friends)
// console.log(popped)

// let shi = friends.shift()// 4 method
// console.log(shi)
// console.log(friends)

// console.log(friends.indexOf("Michael"))// 5 method gets the index of the elements
// console.log(friends.indexOf("Bob"))
// console.log(friends.indexOf("Barbs"))

// console.log(friends.includes("Bob"))
// console.log(friends.includes("Barbs"))
// console.log(friends.includes("Michael"))

///// 🔥 Challenge 2 /////
//     const calcTip = bill => {
//     let tip = bill >= 50 && bill <= 300 ? bill * (15/100) : bill * (20/100)

//     return tip
// }

// // console.log(calcTip(100))

// const bills = [125, 555, 44]
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[bills.length - 1])]

// const totals = [(bills[0] + tips[0]), (bills[1]
//     + tips[1]), (bills[2] + tips[2])]

// console.log(totals)
// console.log(tips)

// const jonas = {
//     firstName : "Barbs",
//     lastName : "Stone",
//     age : 2021 - 2000,
//     job : "Student",
//     friends : ["Thankgod", "Francisca", "Ify", "Jasper"]
// }

// console.log(jonas.age)
// console.log(jonas["age"])
//  let nameKey = "Name"
//  console.log(jonas["last" + nameKey])

//  jonas.location = "Abuja"
//  console.log(jonas)

//  const interestedIn = prompt("What do you wan to knpw about Jonas? Choose between friends, age, firstName, lastName")
//  alert(jonas[interestedIn])

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and her best friend is called ${jonas["friends"][0]}`)

//// 🧠 Challenge 3 ////

// let mark = {
//     fullName : "Mark Miller",
//     mass : 78,
//     height : 1.69,
//     calcBMI : () => {
//         let mass = mark.mass
//         let height = mark.height
//         let bmi = mass / (height ** 2)
//         return bmi
//     }
// }

// let john = {
//     fullName : "John Smith",
//     mass : 92,
//     height : 1.95,
//     calcBMI : () => {
//         let mass = john.mass
//         let height = john.height
//         let bmi = mass / (height ** 2)
//         return bmi
//     }
// }

// let largestBMI = mark.calcBMI() > john.calcBMI() ? `${mark.fullName}'s BMI (${mark.calcBMI()}) is greater than ${john.fullName}'s (${john.calcBMI()})` : `${john.fullName}'s BMI (${john.calcBMI()}) is greater than ${mark.fullName}'s (${mark.calcBMI()})`

// console.log(largestBMI)

// for loop
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}`);
// }

// const jonas = [
//   "Barbs",
//   "Stone",
//   2021 - 2000,
//   "Student",
//   ["Thankgod", "Francisca", "Ify", "Jasper"],
// ];

// const types = [];

// for (let i = 0; i < jonas.length; i++) {
//   console.log(jonas[i]);

//   //filling types of array
//   // types[i] = typeof jonas[i]
//   types.push(typeof jonas[i]);
// }
// console.log(types);

// // 4,3,..,0

// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(i, jonas[i]);
// }

// const years = [1991, 2007, 1988, 2021]
// const ages = []

// for(let i = 0; i < years.length; i++)
// {
//     // console.log(years[i])
//     // let calcAge = 2020 - years[i]
//     // ages[i] = calcAge
//     ages.push(2030 - years[i])
// }

// console.log(ages)

// for(let exercise = 1; exercise < 4; exercise++){
//     console.log(`------ Day ${exercise}`)

//     for(let rep = 1; rep < 6; rep++){
//         console.log(`Exercise ${exercise}: Lifting of weight ${rep}`)
//     }
// }

// let dice = Math.trunc(Math.random() * 6) + 1;

// while (dice !== 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;
//   if (dice === 6) console.log("Loop is about to end...");
// }

// 🔥 challenge 4 🧠

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

const calcTip = (bills) => {
  let tip =
    bills >= 50 && bills <= 300 ? bills * (15 / 100) : bills * (20 / 100);
  return tip;
};

for (let i = 0; i < bills.length; i++) {
  let tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);


const calcAverage = (arr) => {
  let sum = 0;
  let average;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    // console.log(sum);
    average = sum / arr.length;
    // console.log(sum);
  }
  return average
};

console.log(calcAverage(totals));

//   let average = calcAverage(totals[i]);
