function MyPromise(fn) {
    this.res = null;
    this.cbs = [];
    this.status = this.STATUS.PENDING;
    this._execFun(fn);
}
MyPromise.prototype.STATUS = {
    PENDING: 1,
    RESOLVE: 2,
    REJECT: 3
};
MyPromise.prototype._execFun = function (fun) {
    var self = this;
    fun(function () {
        self.res = [].slice.call(arguments);
        self.status = self.STATUS.RESOLVE;
        self._rosolve.call(self,arguments);
    });
};
MyPromise.prototype._rosolve = function (arg) {
    let callback = this.cbs.shift()
    if (this.status = this.STATUS.RESOLVE) {
        callback.apply(callback,this.res);
    }
};
MyPromise.prototype.then = function (fn) {
    this.done(fn);
};
MyPromise.prototype.done = function (fn) {
    
    this.cbs.push(fn);
};
function test() {
    return new MyPromise(function (resolve) {
        setTimeout(()=>{
            resolve("hello");
        },2000)
    });
}
test().then(function (res) {
    console.log(res);
});







