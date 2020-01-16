const fieldRelationship = [{
  name: "build",
  children: [{
      name: "floot",
      children: [
        {
          name: "room"
        },
        {
          name:"room2"
        }
      ]
    },
    {
      name: "floot2",
    }
  ]
}]


const isArray = (node) => {
  return node instanceof Array
}

const ø = Object.create(null)

class MapsStructure{
  constructor(tree){
    this.tree = tree;
    this.maps = this.getMapsStructure(tree);
  }
  getMapsStructure(tree){
    let maps = {};
    const formTree = ( childrens ,parentName) => {
      childrens.forEach(child => {
        if(maps[child.name])throw Error(`字段${child.name}重复`)
        if(parentName){
          try{
            maps[parentName].children = Array.apply(ø,maps[parentName].children)
            maps[parentName].children.push(child.name)
          }catch(err){
            debugger
            throw err
          }
        }
        maps[child.name] = {
          parent:parentName,
          children:[]
        }
        if(child.children)formTree(child.children, child.name)
      })
    }
    formTree(tree)
    return maps
  }
  getParent(name){
    return this.maps[name].parent
  }
  getParents(name){
    let arr = [this.maps[name].parent];
    arr.forEach(item => {
      if(this.maps[item])arr.push(this.maps[item].parent)
    })
    return arr
  }
  getChildren(name){
    return this.maps[name].children
  }
  //获取下级的所有节点
  getAllChildren(name) {
    let arr = this.maps[name].children
    arr.forEach((item) => {
      if(this.maps[item])arr = arr.concat(this.maps[item].children)
    })
    return arr
  }
}

let fieldMaps = new MapsStructure(fieldRelationship)
console.log(fieldMaps.maps);
console.log(fieldMaps.getParent("room"));
console.log(fieldMaps.getParents("room"));
console.log(fieldMaps.getChildren("build"));
console.log(fieldMaps.getAllChildren("build"));
console.log(fieldMaps.getAllChildren("floot"));
