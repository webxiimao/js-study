/*解析器*/
class Compile {
    constructor(el,vm){
        this.$vm = vm
        this.$el = this.isElementNode(el)?el:document.querySelector(el)
        if($el){
            this.$fragment = this.node2fragment(this.$el)
            this.init()
            this.$el.appendChild(this.$fragment)

        }
    }

    node2fragment(el){
        let fragment = document.createDocumentFragment(),
            child = el.firstChild;
        /*此方法根据文档所说遍历el下所有的节点*/
        while (child){
            fragment.appendChild(child)
        }
        return fragment

    }

    init(){
        let self = this
        self.compileElement(this.$fragment)
    }

    compileElement(el){
        let childNodes = el.childNodes,
            self = this;

        childNodes.forEach(node=>{
            let text = node.textContent,
                reg = /\{\{(.*)\}\}/
            if(self.isElementNode(node)){
                self.compile(node)

            }else if(self.isTextElementNode(node)&&reg.test(text)){
                self.compileText(node,RegExp.$1)

            }else if(node.childNodes&&node.childNodes.length>0){
                self.compileElement(node)
            }
        })

    }

    compileText(node,exp){
        compileUtil.text(node, this.$vm, exp)
    }

    compile(node){
        let nodeAttributes = node.attributes,
            self = this;
        [].slice.call(nodeAttributes).forEach(attr=>{
            let attrname = attr.name
            if(self.isDirective(attrname)){
                let dir = attrname.substring(2),//text
                    value = attr.value

            }
        })
    }

    isDirective(attr){
        return attr.indexOf('v-') === 0
    }


    isElementNode(el){
        return el.nodeType === 1
    }

    isTextElementNode(el){
        return el.nodeType === 3
    }
}