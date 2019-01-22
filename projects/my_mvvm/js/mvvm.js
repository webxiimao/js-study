function MVVM(options) {
    let self = this
    this.$options = options
    let data = this._data = this.$options.data
    let el = this.$el = this.$options.el
    console.log(this._data);
    Object.keys(this._data).forEach(key=>{
        self._proxy(key)
    })
    // observer(data,this)
    // this.$compile = new Compile(el || document.body, this)

}

MVVM.prototype = {
    _proxy:function (key) {
        let self = this;
        Object.defineProperty(this._data,key,{
            configurable:false,
            enumerable:true,
            get:function proxyGetter() {
                return self._data[key]
            },
            set:function proxySetter(newVal) {
                self._data[key] = newVal
            }
        })
    }
}