function observer(obj){
  if(!testFieldType(obj, "Object"))return
  for(let key in obj){
    defineObserver(obj, key, obj[key])
  }
}

function defineObserver(obj, key, value){
  const dep = new Dep()
  observer(value)
  Object.defineProperty(obj, key, {
    enumerable:true,
    get(){
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return value
    },
    set(newVal){
      if(value == newVal)return
      value = newVal
      dep.notify(key)
    }
  })
}