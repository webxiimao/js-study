/*发布者*/
function observer(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
	    defineReactive(data, key, data[key]);
	});
};

function defineReactive(data, key, val) {
    observer(val); // 监听子属性
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            //需要一次触发添加watcher
            Dep.target&&dep.addSub(Dep.target)
            return val;
        },
        set: function(newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}

class Dep{
    constructor(){
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub)
    }

    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}