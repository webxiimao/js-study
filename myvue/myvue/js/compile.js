const rgx = /v-(.*)/
const textRgx = /\{\{(.*)\}\}/
const eventRgx = /\@(.*)/

function Compile(vm, el){
  this.vm = vm
  this.el = this.isElement(el) ? el : document.querySelector(el)
  const fragment = this.init()
  vm.$fragment = fragment
  this.el.appendChild(fragment)
}

Compile.prototype.init = function(){
  const childrenNodes = this.el.childNodes
  const fragment = document.createDocumentFragment()
  for(let node of [].slice.call(childrenNodes)){
    fragment.appendChild(this.compileNode(node))
  }
  return fragment
}

Compile.prototype.compileNode = function(node){
  if(this.isElement(node)){
    this.compileElement(node)
  }
  if(this.isText(node)){
    this.compileText(node)
  }
  const childNodes = Array.from(node.childNodes)
  if(childNodes.length > 0){
    childNodes.forEach(child => {
      node.appendChild(this.compileNode(child))
    })
  }
  return node
}

Compile.prototype.compileText = function(node){
  if(textRgx.test(node.nodeValue)){
    const key = RegExp.$1
    new Watcher(this.vm, key, function(value){
      node.nodeValue = value
    })
    
  }
}

Compile.prototype.compileElement = function(node){
  const attrs = Array.from(node.attributes)
  for(let attr of attrs){
    if(rgx.test(attr.name)){
      const directive = RegExp.$1;
      this.bindDirective(directive, node, attr)
    }
  }
}

Compile.prototype.bindDirective = function(directive, node, attr){
  let self = this
  const directives = {
    model(){
      const key = attr.value
      new Watcher(self.vm, key, function(value){
        node.value = value
      })
      node.addEventListener("input", function(e){
        self.vm.data[key] = e.target.value
      })
    },
    click(){
      const key = attr.value
      node.addEventListener("click", function(){
        self.vm.methods[key].call(self.vm)
      })
    }
  }
  directives[directive]()
}

/** 元素节点 */
Compile.prototype.isElement = function(node){
  return node.nodeType == 1
}

/** 文本节点 */
Compile.prototype.isText = function(node){
  return node.nodeType == 3
}

