import React from 'react'

const ca = () => {

    ////// an array of even numbers....
    // const ar1 = [];
    // const arr = () => {
    //     // let newArrList;
    //     for (let i = 1; i <= 255; i++) {
    //         const element = i;
    //         ar1.push(element);
    //     }
    //     console.log(ar1);
    // };

    // arr();

    // ////// sum of even numbers.....
    // const evenNums = () => {
    //     let a;
    //     let sum = 0;
    //     // debugger
    //     for (let num = 1; num <= 1000; num++) {
    //         a = num % 2;
    //         if (a === 0) {
    //             sum += num;
    //         }
    //     }
    //     return sum;
    // }
    // console.log(evenNums())

    // /////// sum of odd numbers
    // const sumOddNums = () => {
    //     let a;
    //     let sumOdd = 0;
    //     for (let num = 1; num <= 5000; num++) {
    //         a = num % 2;
    //         if (a !== 0) {
    //             sumOdd += num
    //         }
    //     }
    //     console.log(sumOdd)
    // }
    // sumOddNums()


    ///////// sum of numbers in an array
    // let myNums = [1, 2, 5]
    // let myNums2 = [-5, 2, 5, 12]
    // const iterateArr = (num) => {
    //     let sum = 0;
    //     for (let i = 0; i < num.length; i++) {
    //         const element = num[i];
    //         // console.log(element)
    //         sum += element

    //     }
    //     // sum += num
    //     return sum
    //     // console.log(num)
    // }
    // console.log(iterateArr(myNums))
    // console.log(iterateArr(myNums2))

    // // let myNums2 = [-5, 2, 5, 12]
    /////// find the maximum no in the array...
    // const maxNum = (num) => {
    //     // let currNum;
    //     // let prevNum = 0;
    //     let maximumNum = num[0];
    //     // let nextNum = 0;
    //     for (let i = 0; i < num.length; i++) {
    //         // currNum = num[i];
    //         if (num[i] > maximumNum) {
    //             // prevNum = currNum;
    //             maximumNum = num[i];
    //         }
    //         // else if (currNum < prevNum && prevNum > currNum) {
    //         //     maximumNum = prevNum;
    //         // }
    //         // else if (currNum < prevNum && prevNum < currNum) {
    //         //     prevNum = currNum
    //         // }

    //     }
    //     return (maximumNum)
    // }
    // console.log(maxNum([-2, 40, 30, -2]))


    /////// the average of the sum of all nos in the array...
    // const averageNum = (num) => {
    //     let sum = 0;
    //     let avg;
    //     for (const myNum of num) {
    //         sum += myNum;
    //     }
    //     avg = sum / num.length
    //     return avg
    // }
    // console.log(averageNum(myNums2))

    ////// output an array of odd nums from 1-50...
    // const oddNums = () => {
    //     let arrOdd = [];
    //     let a;
    //     for (let num = 1; num <= 50; num++) {
    //         a = num % 2;
    //         if (a !== 0) {
    //             arrOdd.push(num)
    //         }
    //     }
    //     return arrOdd
    // }

    // console.log(oddNums())

    /////// get the how many numbers are greater than y...
    // const greaterNum = (num) => {
    //     let y = 3;
    //     let n = []
    //     // debugger
    //     for (let i = 0; i < num.length; i++) {
    //         const element = num[i];
    //         if (element > y) {
    //             n.push(element)
    //         }

    //     }
    //     return n.length
    // }
    // // console.log(greaterNum([1, 3, 5, 7]))
    // console.log(greaterNum([10, 8, 2, 1, 39, 1]))


    /////// get the sqaures of an array...
    // const sqaureNumbers = () => {
    //     let nums = [1, 3, 5, 7]
    //     debugger
    //     let newSquaredNumbers = nums.map((x) => x * x)
    //     return newSquaredNumbers;
    // }
    // console.log(sqaureNumbers())


    ////// a function that replaces any negative number in an array...
    // const replaceNegativeNums = () => {
    //     let nums = [1, -15, 10, -2];
    //     debugger
    //     let newArr = nums.map((y) => {
    //         if (y < 0) {
    //             y = 0
    //         }
    //         return y
    //     })
    //     return newArr
    // }
    // console.log(replaceNegativeNums())

    //////// swapping of the first and last numbers in an array...
    /*
    const swapNumbers = (...num) => {
        let firstNum = num[0];
        let lastNum = num[num.length - 1];
        // let num = [1, 5, 10, -2]
        let numArr = num.map((x) => {
            // firstNum = lastNum;
            // lastNum = firstNum;
            if (x === firstNum) {
                x = lastNum
            } else if (x === lastNum) {
                x = firstNum
            }
            return x
        })
        return numArr
    }
    console.log(swapNumbers(1, 5, 10, -2))
    */

    ////// replaces a negative num with a string 'Dojo'[-1,-1,2]
    /*
      const replce = (...num) => {
          debugger
          let newValues = num.map((y) => {
              if (y < 0) {
                  y = 'Dojo'
              }
              return y
          })
          return newValues;
      }
      console.log(replce(-1, -1, 2))
  */

    //// replaces positive numbers with a string 'big'
    /*
      const makeItBig = (...num) => {
          let newValues = num.map((q) => {
              if (q > 0) {
                  q = 'big'
              }
              return q;
          })
          return newValues
      }
      console.log(makeItBig(1, 5, 10, -2))
  */

    ////// print the lowest value and return the highest value
    /*
      const checkNumbers = (...num) => {
          let highestNum = num[0];
          let leastNum = num[0];
          for (let i = 0; i < num.length; i++) {
              const element = num[i];
              if (element > highestNum) {
                  highestNum = element;
              }
              else if (element < leastNum) {
                  leastNum = element
              }
          }
          console.log(`This is the least number :${leastNum}`)
          return (`this is the highest num :${highestNum}`)
          // return (`The highest number is: ${highestNum} and least is: ${leastNum}`)
      }
  
      checkNumbers(20, 77, 2, 0, 90);
  */

    ////// print the second-to-last value in the array and return the first odd num in the array
    /*
    const detect = (...num) => {
        debugger
        // let q = num.splice(-2)[0]
        let q;
        let a;
        for (let i = 0; i < num.length; i++) {
            const element = num[i];
            q = num[num.length - 2]
            a = element % 2;
            if (a !== 0) {
                return element;
            }
            console.log(q)
        }
    }
    detect(20, 77, 2, 0, 90)
    


    /////// double the elements in an array without altering the values in the arrat
    /*
      const doubleArr = (...num) => {
          let newDoubledArr = num.map((t) => t * t)
          return newDoubledArr
      }
      console.log(doubleArr(1, 5, 10, -2))
  */

    ////// replacing the last number in the array with the total +ve numbers...
    /*
      const countPositiveNum = (...num) => {
          let lastNum = num.length - 1
          let positiveNumbers = []
          let newArray = num.map((q, index) => {
              if (q > 0) {
                  positiveNumbers.push(q)
              }
              if (index === lastNum) {
                  q = positiveNumbers.length
              }
              return q
          })
          console.log(newArray)
      }
      countPositiveNum(-1, 1, 1, 1)
  */

    ////// if either odd or even appears thrice in a row show 'more odds'
    const checkAe2w = (currValue) => {
        let prevNum = true
        let count = 0;
        if (currValue === true) {
            if (prevNum === currValue) {
                count += 1;
                prevNum = currValue
            } else {
                count = 1;
                prevNum = currValue
            }
        }
        console.log(count)
    }
    const checkNumbers = (...num) => {
        let a;
        let currValue
        // let currNum =num[0]
        // debugger
        let newArr = []
        for (let i = 0; i < num.length; i++) {
            // const element = num[i];
            currValue = num[i];
            a = currValue % 2;
            if (a === 0) {
                currValue = true
                newArr.push(currValue)
            }
            else if (a !== 0) {
                currValue = false
                newArr.push(currValue)
            }
            // if(a === 0){
            //     if(i[0] && i[1] && i[2] === a){
            //         console.log('Even more so')
            //     }
            //     else{
            //         console.log('Falsy values')
            //     }
            // }

        }
        for (let y = 0; y < newArr.length; y++) {
            debugger
            currValue = newArr[y];
            checkAe2w(currValue)
        }
        console.log(newArr)

        // let evenNumbers = num.map((q) => {
        //     let a = q % 2;
        //     if(a !== 0){
        //         return q
        //     }
        // })
    }
    checkNumbers(20, 77, 2, 0, 90)


    return (
        <div>
            {/* <h1>
                my array list : { }
            </h1> */}
        </div>
    )
}

export default ca