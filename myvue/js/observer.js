/**
 * 观察者
 * @param obj
 */
function observe(obj) {
    if(!obj || typeof obj !== "object"){
        return;
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj,key,obj[key])
    })

}

/**
 * 递归绑定观察者模式
 * @param obj
 * @param key
 * @param val
 */
function defineReactive(obj,key,val){
    let dep = new Dep()
    observe(val)//递归观察
    Object.defineProperty(obj,key,{
        enumerable : true,
        configurable : false,
        get : function () {
            Dep.target&&dep.addSub(Dep.target)
            return val
        },
        set : function (newVal) {
            if(val == newVal)return//如果值没有改变直接返回
            console.log("哈哈哈，监听到值变化了"+val+'==>'+newVal);
            val = newVal
            dep.notify()//通知所有订阅者
        }
    })
}


function Dep() {
    this.subs = []
}

Dep.prototype = {
    addSub:function (sub) {
        this.subs.push(sub)
    },
    notify:function () {
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}
