let js = "amazing"

console.log(23)

const ageSarah = 2033 - 1934;
console.log(ageSarah >= 18)

//🔥  challenge 1 🔥 
// let marksMass = 95;
// let marksHeight = 1.88;
// let johnsMass = 85
// let johnsHeight = 1.76

// const marksBMI = marksMass / (marksHeight ** 2)

// const johnBMI = johnsMass / (johnsHeight ** 2)

// console.log(marksBMI, johnBMI)

// const markHigherBMI = marksBMI > johnBMI
// console.log(markHigherBMI)


// const firstName = "Asimana"
// const job = "Student"
// const birthYear = 2000
// const year = 2021

// // const barbs = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!'
//  const barbs = `I'm ${firstName}, a ${job} and I'm ${year - birthYear} years old` // template literal
// console.log(barbs)
 
// const age = 15
// const isOldEnough = age >= 18

// if(isOldEnough){
//     console.log("Barbs can start driving 🚓 ")
// }
// else{
//     const yearsLeft = 18 - 15
//     console.log(`Barbs is too young,wait another ${yearsLeft} years`)
// }

// const birthYear = 2019 

// let century;
// if(birthYear <= 2000){
//     century = 20
// }
// else{
//     century = 21
// }
// console.log(century)

//🔥 Challenge 2 🔥  
// let marksMass = 78;
// let marksHeight = 1.69;
// let johnsMass = 92
// let johnsHeight = 1.95

// const marksBMI = marksMass / (marksHeight ** 2)

// const johnBMI = johnsMass / (johnsHeight ** 2)

// if(marksBMI >= johnBMI){
//     console.log(`Mark's BMI (${marksBMI}) is higher than John's BMI (${johnBMI})`)
// }
// else{
//     console.log(`John's BMI (${johnBMI}) is higher than Mark's (${marksBMI})`)
// }


// type conversion
// const inputYear = "1992";
// console.log(Number(inputYear) + 20)
// console.log(Number(inputYear), inputYear)

// console.log(String(23), 23)

// // type coercion
// console.log("I'm " + 23 + " years old")
// console.log("23" - "3" - "4")



//falsy values - undefined, 0, "", Nan, null
// let age;
// if(age){// if statement automatically takes a boolean type
//     console.log("You are a big girl")
// }
// else{
//     console.log("You're little girl")
// }

// const favourite = prompt("What's your favourite number?")
// console.log(typeof favourite)

// const hasDriversLicence = true
// const hasGoodVision = true
// const age = prompt("How old are you?")

// if(hasDriversLicence && hasGoodVision && age >= 18){
//     console.log("Sarah can begin to drive")
// }
// else{
//     console.log("Someone else should take over the wheels")
// }
// console.log(hasDriversLicence && hasGoodVision)
// console.log(hasDriversLicence || hasGoodVision)



// 🔥 Challenge 3 🔥 
// let dolphinsScore1 = 96
// let dolphinsScore2 = 108
// let dolphinsScore3 = 89

// let koalasScore1 = 88
// let koalasScore2 = 91
// let koalasScore3 = 110


// const dolphinsAverage = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3

// const koalasAverage = (koalasScore1 + koalasScore2 + koalasScore3) / 3


// if(dolphinsAverage === koalasAverage){
//     console.log("That is draw")
// }
// else if(dolphinsAverage > koalasAverage){
//     console.log("The Dolphins are the winners!!")
// }
// else{
//     console.log("The Koalas won!!")
// }


// const dolphinsAverage = (97 + 112 + 101) / 3

// const koalasAverage = (109 + 95 + 106) / 3



// if(dolphinsAverage > koalasAverage && dolphinsAverage >= 100 )
// {
//     console.log("The Dolphins are the winners!!")
// }

// else if(koalasAverage > dolphinsAverage && koalasAverage >= 100)
// {
//     console.log("The Koalas won!!")
// }
// else if(dolphinsAverage === koalasAverage && dolphinsAverage >= 100 && koalasAverage >= 100)
// {
//     console.log("It is a draw")
// }
// else{
//     console.log("No one wins the trophy")
// }


// const age = 33

// // age <= 18 ? console.log("You can drink wine 🍷 ") : console.log("You should drink water 💧 ")

// const drink = age >= 18 ? "You can drink wine 🍷 " : "You should drink water 💧 "
// console.log(drink)

// 🧠 Challenge 4

// let billValue = 275 ;
// const tip = billValue >= 50 && billValue <= 300 ? ((15)/100) * billValue : ((20)/100) * billValue;
// let finalValue = billValue + tip;


// console.log(`The bill was ${billValue}, the tip was ${tip} and the total value was ${finalValue}`)
