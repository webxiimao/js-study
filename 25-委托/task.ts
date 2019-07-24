let Task = {
    setID: function(ID:number){
        this.id = ID
    },
    outputID:function(){
        console.log(this.id);
        
    }
}


let XYZ = Object.create(Task)
console.log(XYZ);


