type MyPromise = {
    [propName:string]:any
}

interface MyPromiseProps {
    then:(fn:()=>void) => void
}

function MyPromise(fn: (resolve:(arg:any)=>void)=>void):void{
    this.res = null;
    this.cbs = []
    this.status = this.STATUS.PENDING
    this._execFun(fn)
}

MyPromise.prototype.STATUS = {
    PENDING:1,
    RESOLVE:2,
    REJECT:3
}

MyPromise.prototype._execFun = function(fun:(resolve:()=>void)=>void){
    let self = this
    fun(function(){
        self.res = [].slice.call(null, arguments)
        self.status = self.STATUS.RESOLVE
        self._rosolve(self.cbs.shift())
    })
}

MyPromise.prototype._rosolve = function(fn:(res:any) => void):void{
    if(this.status = this.STATUS.RESOLVE){
        fn(this.res)
    }
}


MyPromise.prototype.then = function(fn:()=>void):void{
    this.done(fn)
}

MyPromise.prototype.done = function(fn:()=>void):void {
    this.cbs.push(fn)
}


function test(){
    return new MyPromise((resolve)=>{
        resolve("hello")
    })
}

test().then((res) => {
    console.log(res);
    
})
