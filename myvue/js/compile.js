/*为了提高效率将dom转换成fragment再加入到dom中*/
/**
 *
 * @param el vue.el
 * @param vm this ==> mvvm本身
 * @constructor
 */
function Compile(el,vm){
    this.$vm = vm
    this.$el = this.isElementNode(el)? el : document.querySelector(el)
    if(this.$el){
        this.$fragment = this.node2fragment(this.$el)
        this.init()
        this.$el.appendChild(this.$fragment)
    }
}


Compile.prototype = {
    init:function () {
        this.compileElement(this.$fragment)
    },
    node2fragment:function (el) {
        let fragment = document.createDocumentFragment(),
            child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment

    },
    compileElement:function (el) {
        let childNodes = el.childNodes,
            self = this;
        childNodes.forEach(node=>{
            let text = node.textContent;
            // console.log(text);
            let reg = /\{\{(.*)\}\}/
            if(self.isElementNode(node)){
                self.compile(node)
            }else if(self.isTextNode(node)&&reg.test(text)){
                // debugger
                self.compileText(node, RegExp.$1)
            }

            if(node.childNodes&&node.childNodes.length>0){
                self.compileElement(node)
            }
        })

    },

    compileText:function(node,exp){
        compileUtil.text(node,this.$vm,exp)
    },

    compile:function (node) {
        // console.log(node);
        let nodeAttrs = node.attributes,
            self = this;


        [].slice.call(nodeAttrs).forEach(attr=>{
            var attrname = attr.name;//v-text
            if(self.isDirective(attrname)){
                let exp = attr.value,
                    dir = attrname.substring(2);//text
                if(self.isEventDirective(dir)){//on:
                    compileUtil.eventHandler(node,self.$vm,exp,dir)
                }else{
                    compileUtil[dir] && compileUtil[dir](node,self.$vm,exp)
                }
            }
        })
    },


    isDirective:function (attr) {
        return attr.indexOf('v-') === 0
    },
    isEventDirective:function (dir) {
        return dir.indexOf('on') === 0
    },
    isElementNode:function (node) {
        return node.nodeType == 1
    },
    isTextNode:function (node) {
        return node.nodeType == 3
    }
}


/**
 *
 * @type {{text: compileUtil.text, bind: compileUtil.bind}}
 */
let compileUtil = {
    text:function (node,vm,exp) {
        this.bind(node,vm,exp,'text')
    },
    model:function(node,vm,exp){
        this.bind(node,vm,exp,'model')
        let self = this,
            val = self._getVMVal(vm,exp)//获取到exp对应的value
        node.addEventListener('input',e=>{
            let newVal = e.target.value;
            if(val === newVal){
                return
            }
            self._setVMVal(vm,exp,newVal)
            val = newVal
        })
    },
    bind:function(node,vm,exp,dir){
        let updaterFn = updater[dir + 'Updater']
        updaterFn && updaterFn(node,vm[exp])
        new Watcher(vm,exp,function(value,oldValue){
            updaterFn(node,value,oldValue)
        })
    },
    _getVMVal(vm,exp){
        let val = vm,
            self = this;
        exp = exp.split('.')
        exp.forEach(v=>{
            val = val[v]
        })
        return val
    },
    _setVMVal(vm,exp,newVal){
        let val = vm
        exp = exp.split('.');
        exp.forEach(v=>{
            //如果不是最后一个属性递归查找
            if(v<exp.length-1){
                val = val[v]
                //如果是直接赋值
            }else{
                val[v] = newVal
            }
            /**
             * 赋值完成后触发watcher,
             * watcher触发其回调函数更新node的值实现双向绑定
             */
        })
    }
}

let updater = {
    textUpdater: function (node, value) {
        node.textContent = typeof value === 'undefined'?'':value
    },
    modelUpdater:function (node, value) {
        node.value = typeof value === 'undefined'?'':value
    }
}