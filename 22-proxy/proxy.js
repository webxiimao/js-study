var proxy = new Proxy({}, {
    get: function (target, key, res) {
        return 35;
    }
});
console.log(proxy);
