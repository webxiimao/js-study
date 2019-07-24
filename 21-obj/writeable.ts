let myObj:{[propName:string]:any} = {
    a:2
}

type Obj = {
    o:{
        [propName:string]:any
    },
    readonly b:number
}

let obj:Obj = {
    o:myObj,
    b:3
}


console.log(obj);
Object.defineProperty(obj, 'o' ,{
    writable:false,
    configurable:false,
})

Object.defineProperty(obj, 'b' ,{
    writable:false,
    configurable:false,
})

myObj.a = 3
console.log(obj);
obj.b = 5//“use strick” error
console.log(obj);




