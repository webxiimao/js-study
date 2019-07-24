interface Function {
    myCall:(context:any) => void
}

Function.prototype.myCall = function(context:any):void{
    context.Fn = this
    context.Fn()
    delete context.Fn
    
}


function add():void{
    console.log(this);
    alert(this.name)
    return this.name
}

interface Foo  {
    name:string
}

let boo:Foo = {
    name:"mark"
}

add()