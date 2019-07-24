var MyModules = (function () {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0, len = deps.length; i < len; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    return {
        define: define,
        get: get,
    };
})();
MyModules.define("bar", [], function () {
    function hello(name) {
        return "Hello" + name;
    }
    return {
        hello: hello
    };
});
MyModules.define("foo", ["bar"], function (bar) {
    console.log(bar);
    function awesome() {
        console.log(bar.hello("hippo").toUpperCase());
    }
    return {
        awesome: awesome,
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
foo.awesome();
get,
;
();
MyModules.define("bar", [], function () {
    function hello(name) {
        return "Hello" + name;
    }
    return {
        hello: hello
    };
});
MyModules.define("foo", ["bar"], function (bar) {
    console.log(bar);
    function awesome() {
        console.log(bar.hello("hippo").toUpperCase());
    }
    return {
        awesome: awesome,
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
foo.awesome();
