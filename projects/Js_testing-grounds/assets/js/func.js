// function calArea( b , h){
//     var area;
//         area =  b * h ;
//         return area;

// }

// var base = prompt("Enter the value of b")
// var height = prompt("Enetr the value of h")
// var calPara = calArea( base , height);

// console.log("The area of this parallelogram " + " is " + calPara);


// function calc(points){
//   var area;
//   var i = 0;
//   var circle;
//   circle = area + i;
//   return circle;
// }

var num;
var evenNum;

for (i = 0 ; i <= 100 ; i++){
  evenNum = i % 0 ;
  num = i ;
  if (evenNum != 0){
    continue;
  }
  else{
    skipNum();
    if (num == Skip){
      continue;
    }
console.log(num + " <br> ")
}
}

function skipNum(){
  var checkNum = [10, 30 , 46 , 50 , 96];
  var rand = Math.floor(Math.random() * checkNum.length);
  var Skip = checkNum[rand];
  return Skip;
}
