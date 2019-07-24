let Something:{[propName:string]:any} = {
    cool:function(){
        this.greeting = "Hello World!"
    }
}

Something.cool()
console.log(Something);
