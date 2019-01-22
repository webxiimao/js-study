function Watcher(vm, exp, cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    //触发属性的getter
    this.value = this.get()
}


Watcher.prototype = {
    update:function(){
        this.run()
    },
    run:function () {
        let value = this.get();
        let oldVal = this.value
        if(value!==oldVal){
            this.value = value;
            this.cb.call(this.vm,value,oldVal)
        }

    },
    get:function (key) {
        Dep.target = this;
        let value = this.vm[this.exp]
        Dep.target = null;
        return value
    },
}