function testFieldType(data,type){
  return Object.prototype.toString.call(data) == `[object ${type}]`
}