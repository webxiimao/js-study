type Obj = {
    id : string,
    cool : () => void
}

let obj:Obj = {
    id: "awesome",
    cool: function coolFn(){
        let self = this
        console.log(this);
        
        console.log(self.id);
        
    }
}

let id:string = "not awesome";

setTimeout(obj.cool,100)