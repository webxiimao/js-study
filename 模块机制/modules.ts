type Modules<T = any> = (...arg:any) => T

type ReturnFun = {
    [propName:string]:Modules
}

type MyModules = {
    define:(name:string, deps:any[], impl:Modules) => void,
    get:<T extends ReturnFun = ReturnFun>(name:string) => T
}

let MyModules:MyModules = (
   function () {
       let modules = {}
       function define(name:string, deps:any[], impl:Modules):void {
           for(let i:number = 0, len:number = deps.length; i < len; i++){
               deps[i] = modules[deps[i]]
           }

           modules[name] = impl.apply(impl, deps)
       }

       function get<T extends ReturnFun = ReturnFun>(name:string):T {
            return modules[name]
       }

       return {
           define,
           get,
       }
   }
)()


MyModules.define("bar",[],function():{ hello:Modules }{
    function hello(name:string){
        return "Hello" + name
    }

    return {
        hello
    }
})


MyModules.define("foo",["bar"],function(bar:{ hello:Modules }):{ awesome:Modules }{
    console.log(bar);
    
    function awesome(){
        console.log(bar.hello("hippo").toUpperCase());
        
    }

    return {
        awesome,
    }
})


let bar = MyModules.get<{hello:Modules}>("bar")
let foo = MyModules.get<{awesome:Modules}>("foo")

foo.awesome()