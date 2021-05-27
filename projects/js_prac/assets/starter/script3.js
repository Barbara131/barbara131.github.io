"use strict";

// const x = 45;
// console.log(x - 20);

// const temperature = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// const calcTempAverage = (t1, t2) => {
//   let temps = t1.concat(t2);

//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== "number") continue;

//     if (curTemp > max) {
//       max = curTemp;
//       //   console.log(max);
//     }
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// console.log(calcTempAverage([5, 9, 2], [3, 10, 4]));

// const measureKelvin = function () {
//   const measurement = {
//     type: "temp",
//     unit: "celsius",
//     value: Number(prompt("Degrees celsius")),
//   };

//   console.table(measurement);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// console.log(measureKelvin());

// 🧠 challenge 🔥 //

// let maxTemp = [17, 21, 23];
let maxTemp = [12, 5, -5, 0, 4];

const printForecast = (arr) => {
  let currTemp;
  let str = "... ";

  for (let i = 0; i < arr.length; i++) {
    currTemp = arr[i];
    str += `${currTemp}°C in ${i + 1} days ... `;
  }
  return str;
};

console.log(printForecast(maxTemp));
