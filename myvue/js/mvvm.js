MVVM.prototype = {
    _proxy:function (key) {
        let self = this;
        Object.defineProperty(self,key,{
            configurable:false,
            enumerable:true,
            get:function proxyGetter() {
                return self._data[key]
            },
            set:function proxySetter(newVal) {
                self._data[key] = newVal
            }
        })
    },
}

function MVVM(options) {
    // let self = this
    this.$options = options;
    let data = this._data = this.$options.data;
    let self = this
    Object.keys(this._data).forEach(function (key) {
        self._proxy(key)
    })
    observe(data,this);
    this.$compile = new Compile(options.el || document.body,this)
}