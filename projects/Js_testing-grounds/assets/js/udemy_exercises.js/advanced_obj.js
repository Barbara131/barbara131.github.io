// /// its false
// [2] === [2];
// /// its false
// {} === {};

class Animal{
    constructor(name, type, color){
        this.name = name;
        this.type = type;
        this.color = color;
    }
    introduce(){
        console.log(`I'm a ${this.name} `)
    };
};

class Mammal extends Animal{
    constructor(name, type, color){
        super(name, type, color)
        
    }
            sound(){
                console.log(`Moo my name is ${this.name}, I am a  ${this.type} and i distinctly possess this color which is ${this.color}`)
            }
};

const Cow = new Mammal("Cow", "mammal", "white");
