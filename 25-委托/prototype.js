function Bar(name, age) {
    this.name = name,
        this.age = age;
}
Bar.prototype.say = function () {
    console.log("hello, i am Bar");
};
function Foo(name,age) {
    Bar.call(this,name,age)
}
var bar = new Bar("mark", 19);

console.log(bar);

console.log(Object.create(Bar.prototype));

Foo.prototype = Object.create(Bar.prototype);
Foo.prototype.constructor = Foo
var foo = new Foo()
console.log(foo);

