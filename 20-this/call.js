Function.prototype.myCall = function (context) {
    context.Fn = this;
    context.Fn();
    delete context.Fn;
};
function add() {
    console.log(this);
    alert(this.name);
    return this.name;
}
var boo = {
    name: "mark"
};
add();
