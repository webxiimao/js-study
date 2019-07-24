function Foo(name){
    this.name = name
}

function Bar(name, label){
    Foo.call(this, name)
    this.label = label
}


Bar.prototype.a = "bar a"
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.constructor = Bar
Foo.prototype.a = "foo a"

var bar = new Bar("bar",'label')
var foo = new Foo("foo")
console.log("bar",bar);
console.log("foo",foo);