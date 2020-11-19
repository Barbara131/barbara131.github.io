// function Add(x = 0, y = 0){
//     // "use strict";
//     var z = x + y;  //adding x and y...
//     console.log(z);
//     return z;
// }

// Add(3,44);

// function Subt(b = 0, c = 0){
//     var a = b - c;
//     return a;
// }

// // Subt(23, -5);

// function Div (n = 0, b =0){
//     var m = n / b;
//     return m;
// }

// function Multi(x = 0, y = 0){
//     var z = x * y;
//     return z;
// }

// function Complex(a = 0, b = 0, y = 0){
//     var x = 2;
//     var z = a*(x^2) + b*(x) + y;
//     return z;
// }

// var txt = ""; 
// for(i = 0 ; i < 10 ; i++){
//     txt += "The answer is " + i + " <br> " ;
// }
// console.log(txt);
// document.write(txt);


// for(i = 2 ; i <= 100 ; i = i + 2){

//     if (i == 14 && i < 16 ) {
//         continue;
//     }

//     else if(i >= 90 && i < 98){
//         continue;
//     }

//     else if( i > 40 && i < 48 ){
//         continue;
//     } 

//     console.log(i + " <br> ");
// }


//  var t = "";
// var Arr = [6 , 8 , 18 , 10 , 14];

// for( var i = 2 ; i < 20 ; i++ ){
//     var curNum = i ;
//     var even = curNum % 2 ;

//     if(even != 0){
//         continue;
//     }
//     else {
//         var isExcluded;// setting it to default false, then the for loop should be true...

//         for( var x = 0 ; x < Arr.length ; x++){

//             if( curNum == Arr[x]){
//                 isExcluded = true; // Everything inside each blocks are statements( is a line of code.) 
//                 break;
//             }
//         }

//         if(isExcluded == true){
//             continue;
//         }
     
//     }
//     console.log( i + " <br> ");
// }


function sing( fname , age , chord){
    if( chord == 200 ){
        console.log( fname + " with this age " + age + " can sing well!!" + " <br> ");
    }
    else{
        console.log( fname + " with this age " + age + " go for training!!!");
    }
}

sing( "Barbara" , 20 , 150);

var name = prompt("Type in your name");
sing(name , 23 , 200);

