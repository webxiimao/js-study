let uid = 0
function Watcher(vm, key, callback){
  this.vm = vm;
  this.key = key
  this.value = undefined
  this.callback = callback
  this.id = ++uid
  Dep.target = this
  this.get()
  Dep.target = null;
}

Watcher.prototype.get = function(){
  const vm = this.vm
  const key = this.key
  const value = vm.data[key]
  this.value = value
  return value
}

Watcher.prototype.update = function(){
  this.get()
  this.vm.$batcher.push(this)
}