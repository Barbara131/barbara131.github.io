const check = document.querySelector(".check");
const guess = document.querySelector(".guess");
const number = document.querySelector(".number");

check.addEventListener("click", doSomething);

function doSomething() {
  let saveVal = guess.value;
  console.log(saveVal);
  number.innerHTML = saveVal;
}

if (guess.value === 10) {
  document.getElementsByTagName("body").style.backgroundColor = "yellow";
  //   document.querySelector(".number").style.width = "300px";
}
