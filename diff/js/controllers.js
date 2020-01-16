
const patchesController = {
  insert(newElement, oldElement){
    return {
      type:"INSERT",
      newElement,
      oldElement,
    }
  },
  create(newVnode, oldElement){
    return {
      type:"CREATE",
      newVnode,
      oldElement,
    }
  },
  /**
   * 把大量的元素添加到某个参照之前
   * @param {*} elements 元素集合
   * @param {*} startIndex 开始的index
   * @param {*} endIndex 结尾的index
   * @param {*} refElm 在xx元素之前
   */
  addNodes(elements, startIndex, endIndex, refElm){
    return {
      type:"ADDNODES",
      newVnodes:elements.slice(startIndex, endIndex + 1),
      oldElement:refElm
    }
  },
  remove(elements, startIndex, endIndex){
    return {
      type:"REMOVE",
      oldVnodes:elements.slice(startIndex, endIndex)
    }
  }
}

const nodeController = {
  nextSibling(node){
    return node.nextSibling
  },
  insert(root, patch){
    if(!patch.oldElement){
      root.appendChild(patch.newElement)
    }else{
      root.insertBefore(patch.newElement, patch.oldElement)
    }
  },
  create(root, patch){
    if(!patch.oldElement){
      root.appendChild(patch.newVnode.render())
    }else{
      root.insertBefore(patch.newVnode.render(), patch.oldElement)
    }
  },
  addNodes(root, patch){
    const nodes = patch.newVnodes
    if(nodes.length > 0){
      for(let i = 0; i < nodes.length; i++){
        this.create(root,{
          oldElement:patch.oldElement.elm,
          newVnode:nodes[i]
        })
      }
    }
  },
  remove(root, patch){
    const oldVnodes = patch.oldVnodes
    for(let i = 0; i < oldVnodes.length; i++){
      root.removeChild(oldVnodes[i].elm)
    }
  }
}