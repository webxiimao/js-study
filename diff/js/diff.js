const oldVnode = el("ul", { id:"father", key:"father" }, [
  el("li", { id:"li1", key:"li1" }, "hello"),
  el("li", { id:"li2", key:"li2" }, [ 
    el("li", { id:"li11", key:"li11" }, "1") ,
    el("li", { id:"li12", key:"li12" }, "2") ,
    el("li", { id:"li13", key:"li13" }, "3") ,
  ]),
  el("li", { id:"li3", key:"li3" }, " sb"),
  el("li", { id:"li4", key:"li4" }, " zjj"),
])

const newVnode = el("div", { id:"father", key:"father" }, [
  el("li", { id:"li5", key:"li5" }, " dd"),
  el("li", { id:"li2", key:"li2" },[ 
    el("li", { id:"li11", key:"li11" }, "1") ,
    // el("li", { id:"li12", key:"li12" }, "2") ,
    // el("li", { id:"li13", key:"li13" }, "3") ,
    // el("li", { id:"li14", key:"li14" }, "4") ,
  ]),
  el("li", { id:"li1", key:"li1" }, " hello"),
  el("li", { id:"li4", key:"li4" }, " zjj"),
  el("li", { id:"li3", key:"li3" }, " sb"),
])

/** 判断是否是同一节点，目前只是通过key是否相等来判断 */
function sameVnode(oldVnode, newVnode){
  if(oldVnode.attrs.key === newVnode.attrs.key){
    newVnode.elm = oldVnode.elm
    return true
  }else{
    return false
  }
}

/** 创建一个key 对应index的hash表 */
function createKeyToIdx(vnode){
  let hash = {}
  vnode.forEach((item,index) => hash[item.attrs.key] = index)
  return hash
}

function isUdf(node){
  return node == null || node == undefined
}

const root = document.getElementById("app");
root.appendChild(oldVnode.render())
patch(root, oldVnode, newVnode)
function patch(root ,oldVnode, newVnode){
  /** 如果没有老节点，则直接生成新节点 */
  if(isUdf(oldVnode)){
    root.innerHTML = ""
    root.appendChild(newVnode.render())
  /** 如果新节点是undefined 说明节点已经全部清空， 则删除老节点 */
  }else if(isUdf(newVnode) || isType(newVnode, "String")){
    root.innerHTML = newVnode || ""
  }else{
    /** dom操作的指令集 */
    const nc = nodeController
    /** 生成一个key => node 对应的映射表 */
    const patches = diff(oldVnode, newVnode)
    console.log(patches);
    
    patches.forEach(patch => {
      // debugger
      if(patch.type == "INSERT"){
        nc.insert(root, patch)
      }else if(patch.type == "CREATE"){
        nc.create(root, patch)
      }else if(patch.type == "ADDNODES"){
        nc.addNodes(root, patch)
      }else if(patch.type == "REMOVE"){
        nc.remove(root,patch)
      }
    })
  }
}

function diff(oldVnode, newVnode){
  oldVnode = isType(oldVnode, "Array") ? oldVnode : [oldVnode]
  newVnode = isType(newVnode, "Array") ? newVnode : [newVnode]
  /** 队列操作的指令集 */
  const pc = patchesController
  /** dom操作的指令集 */
  const nc = nodeController
  /** 定义的操作的patches集合 */
  let patches = []
  /** 旧的起始index */
  let oldStartIdx = 0
  /** 旧的结尾的index */
  let oldEndIdx = oldVnode.length - 1
  /** 旧的起始的节点 */
  let oldStartVnode = oldVnode[oldStartIdx]
  /** 旧的结尾的节点 */
  let oldEndVnode = oldVnode[oldEndIdx]
  /** 新的起始index */
  let newStartIdx = 0
  /** 新的结尾的index */
  let newEndIdx = newVnode.length - 1
  /** 新的起始的节点 */
  let newStartVnode = newVnode[newStartIdx]
  /** 新的结尾的节点 */
  let newEndVnode = newVnode[newEndIdx]
  let oldKeyToIdx;
  //循环直到index溢出 =》 即遍历完成
  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
    /** 由于在对比key的时候可能会清空oldVnode用于防止重复key 所以要对undefined状态做处理 */
    if(isUdf(oldStartVnode)){
      oldStartVnode = oldVnode[++oldStartIdx]
    }else if(isUdf(oldEndVnode)){
      oldEndVnode = oldVnode[--oldEndIdx]
    /** 老的起始节点和新的起始节点相等则遍历子节点 */
    }else if(sameVnode(oldStartVnode, newStartVnode)){
      patch(oldStartVnode.elm, oldStartVnode.children, newStartVnode.children)
      oldStartVnode = oldVnode[++oldStartIdx]
      newStartVnode = newVnode[++newStartIdx]
    /** 如果旧的结尾节点和新的结尾节点相同则遍历子节点 */
    }else if(sameVnode(oldEndVnode, newEndVnode)){
      patch(oldEndVnode.elm, oldEndVnode.children, newEndVnode.children)
      oldEndVnode = oldVnode[--oldEndIdx]
      newEndVnode = newVnode[--newEndIdx]
    /** 如果老的开始节点和新的结尾节点相同，则说明新的节点跑到老得后面去了 */
    }else if(sameVnode(oldStartVnode, newEndVnode)){
      patch(oldStartVnode.elm, oldStartVnode.children, newEndVnode.children)
      patches.push(pc.insert(oldStartVnode.elm, nc.nextSibling(oldEndVnode.elm)))
      oldStartVnode = oldVnode[++oldStartIdx]
      newEndVnode = newVnode[--newEndIdx]
    /** 如果老的结尾节点和新的开始节点相同， 则说明新的节点跑到老的前面去了 */
    }else if(sameVnode(oldEndVnode, newStartVnode)){
      patch(oldEndVnode.elm, oldEndVnode.children, newStartVnode.children)
      patches.push(pc.insert(oldEndVnode.elm, oldStartVnode.elm))
      oldEndVnode = oldVnode[--oldEndIdx]
      newStartVnode = newVnode[++newStartIdx]
    }else{
      /** 如果上述情况都不存在 */
      if(!oldKeyToIdx) oldKeyToIdx = createKeyToIdx(oldVnode)
      /** 获取和当前节点newStartVnode节点相同的index */
      let idxInOld = oldKeyToIdx[newStartVnode.attrs.key]
      /** 如果没有该节点说明应该创建该节点 */
      if(isUdf(idxInOld)){
        patches.push(pc.create(newStartVnode, oldStartVnode.elm))
        newStartVnode = newVnode[++newStartIdx]
      /** 如果当前的开始节点和key中存的节点相同则吧moveNode移到前面 */
      }else{
        let moveNode = oldVnode[idxInOld]
        if(sameVnode(moveNode ,newStartVnode)){
          patch(moveNode.elm, moveNode.children, newStartVnode.children)
          patches.push(pc.insert(moveNode.elm, oldStartVnode.elm))
          newStartVnode = newVnode[++newStartIdx]
          oldVnode[idxInOld] = undefined
        }else{
          patches.push(pc.create(newStartVnode, oldStartVnode.elm))
          newStartVnode = newVnode[++newStartIdx]
        }
      }
      
    }
  }
  /** 说明老节点已经遍历完了， 因此现在吧后续的新节点都添加进去 */
  if(oldStartIdx > oldEndIdx){
    const refElm = newVnode[newStartIdx + 1] ? newVnode[newStartIdx + 1] : null
    patches.push(pc.addNodes(newVnode, newStartIdx, newEndIdx, refElm))
  /** 说明存在多余的元素 */
  }else{
    patches.push(pc.remove(oldVnode, oldStartIdx, oldEndIdx))
  }
  return patches
}