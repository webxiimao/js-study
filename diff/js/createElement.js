function isType(data, type){
  return Object.prototype.toString.call(data) === `[object ${type}]`
}

class CreateElement {
  constructor(tag, attrs, children){
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.elm = null
  }

  render(){
    const fragment = document.createDocumentFragment()
    const elm = document.createElement(this.tag)
    const children = this.children
    const attrs = this.attrs
    for(let key in attrs){
      const attr = attrs[key]
      elm.setAttribute(key, attr)
    }
    if(isType(children, "Array")){
      children.forEach(item => {
        elm.appendChild(item.render())
      })
    }
    if(isType(children, "String")){
      elm.appendChild(document.createTextNode(children))
    }
    fragment.appendChild(elm)
    this.elm = elm
    return fragment
  }
}


function el(tag, props, children){
  //先简单把key 绑定为id
  return new CreateElement(tag, props, children)
}