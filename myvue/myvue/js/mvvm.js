
function Vue(options){
  this.el = options.el;
  this.data = options.data
  this.methods = options.methods
  this.$batcher = new Batcher()
  observer(this.data)
  this.$compile = new Compile(this, this.el)
}

