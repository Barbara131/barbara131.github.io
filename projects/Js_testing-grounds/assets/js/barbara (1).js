function PrintAllEvenNumbersBetweenAGivenRange(startRange, endRange, unPrintableNumbers, amountToExclude) {

    unPrintableNumbers = GenerateRandomEvenNumbers(amountToExclude, startRange, endRange, []);

    var printableNumbers = []; // This array holds all printable even numbers
    
    console.log("The range is from " + startRange + " to " + endRange);

    for(var i = startRange; i <= endRange; i++){ //This loop runs through the start range and end range of the numbers to be printed

        var isEven = false, // This variable is used to set whether the current number is even or not
        evenChecker = 0, // This variable holds the modulus value of the current number when divided by 2
        currentNumber = 0; // Holds the current number being processed        

        currentNumber = i; // Sets The Current Number to the Iterators value
        evenChecker = currentNumber % 2; // Checks If the current number is divisible by two
        
        console.log("The currentNumber is " + currentNumber);
        
        if(evenChecker == 0){ // Checks If the current number is divisible by two, if so sets the isEven Variable to true
            isEven = true;
            console.log("The currentNumber is an even number");
        }
        
        if(isEven){ // if isEven is set to true this block of code runs
            
            var isExcluded = false;
            
            for (var d = 0; d < unPrintableNumbers.length; d++) { // This loop runs through the unPrintableNumbers array which contains numbers to be skipped
                if(currentNumber == unPrintableNumbers[d]){ // This checks if the current number is in side the unPrintableNumbers array and the tag it as isExclude
                    isExcluded = true; // Sets the isExcluded variable to true (Marks the current number for exclusion)
                    console.log("The currentNumber is to be excluded");
                    break;
                }
            }
            
            if(isExcluded){//This checks the is excluded variable if its set to true, if it is set to true it excludes the currentNumber
                
                console.log("The currentNumber has been excluded");
                continue;
                
            }else{                    
                console.log("The currentNumber " + currentNumber + " has been added to the array");
                printableNumbers[printableNumbers.length] = currentNumber; //adds the currentNumber to the printable array
            }
        }            
    }
    
    console.log(printableNumbers + " is ready for printing");
    return printableNumbers;
}

function GenerateRandomEvenNumbers(amount, startRange, endRange, evenNumbers) {
    //evenNumbers; // This array holds the generated numbers
    //amount = 5; // This is the amount of random even numbers to be generated
    
    
    //startRange = 1; // This is the start range of numbers to be generate eg from 1 - xx
    //endRange = 100; // This is the end range of numbers to be generate eg from xx - 100
    // var ans = null; // This variable holds the final Printable Array
    var duplicateRandomNumber = false; // This variable holds the boolean of when the currently generated number is already in the evenNumbers Array
    var randomNumber = Math.floor(Math.random() * endRange) + startRange; // Generates a random number between the startRange And The endRange variable
    
    if((randomNumber % 2) != 0){ //Checks if the currently generated number is not an even number if so it calls the function again.
        console.log(randomNumber + " is not even");
        GenerateRandomEvenNumbers(amount, startRange, endRange, evenNumbers); //Calls The function again.
    }else if(evenNumbers.length != amount){ //This if statement checks if the currently generated even number is welcomed into the evenNumber array(This mean check if the evenNumbers is full yet if not Add the current)
        for(var x = 0; x < evenNumbers.length; x++){ // Loop Through the generated numbers to see if the new randomly generated number is the same with an already generated one.
            if(evenNumbers[x] == randomNumber){
                duplicateRandomNumber = true; // if a duplicate is found it sets the variable duplicateRandomNumber to true so it can be accessed outside this loop
                break;
            }
        }        
        if(duplicateRandomNumber){ // if a duplicate is found it discards the current randomNumber and generates another one.
            console.log(randomNumber + " is Duplicate, Re-running the function to generate another random number");
            GenerateRandomEvenNumbers(amount, startRange, endRange, evenNumbers); //Calls The function again.
        }else{            
                console.log(randomNumber + " is even and has been added to the array");
                evenNumbers[evenNumbers.length] = randomNumber;

                GenerateRandomEvenNumbers(amount, startRange, endRange, evenNumbers); //Calls The function again.
                // Call again to check the stats
            }            
    }

    //This part will run only when the conditions above are false that means the Printable numbers has been generated
    console.log(randomNumber + " The array is full now return it", evenNumbers);
    return evenNumbers;
    // return PrintAllEvenNumbersBetweenAGivenRange(startRange, endRange, evenNumbers);

}

window.onload = function(){    
    //Initializing variables
    var amountToExclude = 10,
    startRange = 1,
    endRange = 50;
    emptyArray = [];
    generatedNumbers = PrintAllEvenNumbersBetweenAGivenRange(startRange, endRange, emptyArray, amountToExclude); // This array runs the GenerateRandomEvenNumbers to generate the ararys of even numbers to exclude from the printableNumbers array
    console.log(generatedNumbers);
};