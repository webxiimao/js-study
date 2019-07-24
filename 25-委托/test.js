function Foo(){

}

function Bar(){
    
}

Bar.prototype = Object.create(Foo.prototype)


console.log(Bar instanceof Foo);
console.log(Bar.prototype instanceof Foo);
