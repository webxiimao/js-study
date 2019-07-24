var myObj = {
    a: 2
};
var obj = {
    o: myObj,
    b: 3
};
console.log(obj);
Object.defineProperty(obj, 'o', {
    writable: false,
    configurable: false
});
Object.defineProperty(obj, 'b', {
    writable: false,
    configurable: false
});
myObj.a = 3;
console.log(obj);
obj.b = 5;
console.log(obj);
