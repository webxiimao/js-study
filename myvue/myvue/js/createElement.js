function createElement(tag, props, childrens){
  const fragment = document.createDocumentFragment()
  const ele = document.createElement(tag)
  
  for(let key in props){
    ele.setAttribute(key, props[key])
  }
  
  if(testFieldType(childrens, "Array")){
    childrens.forEach(children => {
      console.log(children);
      ele.appendChild(children)
    })
  }else if(testFieldType(childrens,"String")){
    const text = document.createTextNode(childrens)
    ele.appendChild(text)
  }
  fragment.appendChild(ele)
  return fragment
}