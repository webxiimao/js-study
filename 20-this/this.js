var obj = {
    id: "awesome",
    cool: function coolFn() {
        var self = this;
        console.log(this);
        console.log(self.id);
    }
};
var id = "not awesome";
setTimeout(obj.cool, 100);
