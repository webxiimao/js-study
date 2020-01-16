function Dep(){
  this.subs = []
}

Dep.prototype.addSub = function(watcher){
  this.subs.push(watcher)
}

Dep.prototype.notify = function(){
  this.subs.forEach(watcher => {
    watcher.update()
  })
}