/*订阅者*/
class Watcher {
    constructor(vm,exp,cb){
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.value = this.get()
    }

    update(){
        let self = this
        self.run()
    }

    run(){
        let self = this
        let value = self.get()
        let oldVal = self.value
        if(value !== oldVal){
            self.cb.call(self.vm,value,oldVal)
        }
    }

    get(){
        Dep.target = this
        let value = this.vm[this.exp]
        Dep.target = null;
        return value
    }
}