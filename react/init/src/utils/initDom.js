import React from "react";
 

class FieldsBaseStore {
    constructor(props){
        this.props = props || {};
    }

    getProps = () => {
        return this.props
    }

    getProp = (name) => {
        return  this.props[name]
    }

    setProps = (name, prop) => {
        this.props[name] = prop
    }

    setDecorator = (name) => {
        return (element) => {
            return React.cloneElement(element,{
                [name]:this.props[name]
            })
        }
    }

    createDomElement = (action, JsxDom) => {
        return (props) => {
            return (
                <React.Fragment>
                    <JsxDom>
                        {this.setDecorator(action)(props.children)}
                    </JsxDom>
                </React.Fragment>
            )
        }
    }
}

export class FieldsStore extends FieldsBaseStore{
    constructor(props,dom){
        super(props)
        this.dom = dom || {}
    }

    getPropElement = (name) => {
        return this.dom[name]
    }

    setPropElement = (name) => (action, JsxDom) => {
        this.dom[name] = this.createDomElement(action, JsxDom)
    }
}


export function initialState(props){
    
    return new FieldsStore(props)
    
}


export function getAndInitTable(option){
    return (element) => {
        return React.cloneElement(element,{
            ...option,
        })
    }
}