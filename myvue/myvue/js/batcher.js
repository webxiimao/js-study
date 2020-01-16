function Batcher(){
  this.has = {}
  this.queue = []
  this.waiting = false
}

Batcher.prototype.push = function(job){
  if(!this.has[job.id]){
    this.has[job.id] = true
    this.queue.push(job)
    if(!this.waiting){
      this.waiting = true
      Promise.resolve().then(() => this.flush())
    }
  }
}

Batcher.prototype.clear = function(){
  this.has = {}
  this.task = []
  this.waiting = false
}

Batcher.prototype.flush = function(){
  this.queue.forEach(job => {
    job.callback(job.value)
  })
  this.clear()
}


