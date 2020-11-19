// let obj = {
//     x : "Test String",
//     y : 50,
//     z : [1,2,3]
// }

function test(){
    return {
        x : "Test String",
        y : 50,
        z : [1,2,3]
    };
}

test().z;


function test1(){
    return [1,2,3];
}

test1()[1];

///////////////////////////
let fun = function(num){
    console.log(num)
};

fun(8);

///////////////////////////
function test2(){
    return function(num){
        console.log(num);
    };
}
fun = test2();

fun(8);
/////////////////////////
console.log([2,5,7,4,345,6787][5])