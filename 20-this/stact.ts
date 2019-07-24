function baz():void {
    console.log(this);
    console.log("baz");
    bar()
}

function bar():void {
    console.log(this);
    console.log("bar");
    foo()
}

function foo():void {
    debugger
    console.log(this);
    console.log("foo");
}

let obj:{[propName:string]:any} = {
    a:22
}

baz.call(obj)