const sumOfEvenNumbers = () => {
  let rem;
  let evenNum;
  let sumOfEvenNum = 0;

  for (let i = 1; i <= 1000; i++) {
    rem = i % 2;
    evenNum = i;
    if (rem == 0) {
      //   console.log(evenNum);
      sumOfEvenNum += evenNum;
      //   console.log(sumOfEvenNum);
    } else continue;
  }
  return sumOfEvenNum;
};

console.log(sumOfEvenNumbers());
