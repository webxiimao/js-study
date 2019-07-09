import React from "react";
 

class FieldsStore {
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