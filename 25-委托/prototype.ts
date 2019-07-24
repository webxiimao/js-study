interface BarProps {
    name:string,
    age:number
}

function Bar(name:string, age:number):void{
    this.name = name,
    this.age = age
}

Bar.prototype.say = function(){
    console.log("hello, i am Bar");
    
}

function Foo(){

}

Foo.prototype = Object.create(Bar.prototype);
console.log(Foo);


var bar:BarProps = new Bar("mark",19)
