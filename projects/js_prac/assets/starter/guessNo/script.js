"use strict";

let num = Math.trunc(Math.random() * 20 + 1);
const input = document.querySelector(".guess");
let message = document.querySelector(".message");
let secretNum = document.querySelector(".number");
let score = document.querySelector(".score");
let scores = score.textContent;
let highScore = document.querySelector(".highscore");
// console.log(highScor);
console.log(scores);
// console.log(secretNum);

const onClick = () => {
  scores = "20";
  input.value = "";
  secretNum.textContent = "?";
  document.querySelector(".score").textContent = scores;
  highScore.textContent = "0";
  message.textContent = "Start guessing...";
  document.body.style.backgroundColor = "#222";
  secretNum.style.width = "15rem";
  num = Math.trunc(Math.random() * 20 + 1);
};

const btn = document.querySelector(".again").addEventListener("click", onClick);

function changeBox() {
  secretNum.textContent = num;
  message.textContent = `🎉 Correct Number!`;
  document.body.style.backgroundColor = `yellow`;
  secretNum.style.width = "30rem";
  highScore.innerHTML = scores;
}

function defaultSecret() {
  secretNum.textContent = "?";
}

const onCheckClick = (e) => {
  let inputValue = Number(input.value);
  // console.log(typeof inputValue);

  // it is true
  if (inputValue === num) {
    changeBox();
  }

  // it isn't true
  else if (inputValue !== num) {
    defaultSecret();
    if (scores > 1) {
      document.body.style.backgroundColor = "#222";
      inputValue > num
        ? `${(message.textContent = "📈 Too high!")}`
        : `${(message.textContent = "📉 Too low!")}`;
      scores--;
      document.querySelector(".score").textContent = scores;
    } else {
      `${(message.textContent = "💥 You lost the game!")})`;
      scores = 0;
    }
  }
};

const checkClick = document
  .querySelector(".check")
  .addEventListener("click", onCheckClick);

// 1. if The input value = secret num
// 2. (yes) the current value in the score should be stores in the highest score also change background   color to #222 and the number width-15rem
// 3. (yes) the message should be correct number
// 4. (no) the score value should be reduce by 1,ie,i--
// 5. if the input num < the secret num
// output(message): too small
// 6. if the input num > the secret num
// output(message): too high
