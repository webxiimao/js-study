function baz() {
    console.log(this);
    console.log("baz");
    bar();
}
function bar() {
    console.log(this);
    console.log("bar");
    foo();
}
function foo() {
    debugger;
    console.log(this);
    console.log("foo");
}
var obj = {
    a: 22
};
baz.call(obj);
