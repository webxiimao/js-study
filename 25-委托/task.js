var Task = {
    setID: function (ID) {
        this.id = ID;
    },
    outputID: function () {
        console.log(this.id);
    }
};
var XYZ = Object.create(Task);
console.log(XYZ);
