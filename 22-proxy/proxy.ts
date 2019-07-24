var proxy:object = new Proxy({},{
    get(target, key, res){
        return 35
    }
})

console.log(proxy);
