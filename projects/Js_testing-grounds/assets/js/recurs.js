function countDown(fromNumber){
    console.log(fromNumber);
    // countDown(fromNumber-1);
    let nextNumber = fromNumber - 1; 
    if(nextNumber > 0){
        countDown(nextNumber);  
    }else{
        console.log( fromNumber , "prev")
        return nextNumber;
    }
}


countDown(3);