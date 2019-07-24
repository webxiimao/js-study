import React from "react";
import { initialState } from "../utils/initDom"


const BarItem =  (props) => {
  
  return (
      <div>
        <div>this is baritem</div>
        {/* {props.children} */}
        {props.children}
      </div>
  )
}

// const Fragment = (props) => {
//   return (
//     <div>{props.children}</div>
//   )
// }

const createElement = (fields) => (WrappedComponent) => {
  return () => {
    const saveData = () => {
      console.log("save data");
    }
  
    const handleClick = (name) => {
      console.log("handleClick",name);
    }
  
    fields.setProps('saveData',saveData)
    fields.setProps('value',88)
    fields.setProps('click',handleClick)
    fields.setProps('fields',fields)
    fields.setPropElement('BarItem')('click',BarItem)
    // fields.setPropElement('Fragment')('fields',Fragment)

    return (
      <WrappedComponent fields={fields} />
    )
  }
}

export default class Bar extends React.Component {
    name = "bar"
    constructor(props){
      super(props)
    }

    static create = (options) => (WrappedComponent) => {
      const fields = initialState()
      
      return createElement(fields)(WrappedComponent)
    }

    componentDidMount(){
      console.log("bar mount",this.props);
      
    }
  
    render(){
      return (
        <React.Fragment>
          <div>this is Bar</div>
          {this.props.children}
        </React.Fragment>
      )
    }
  }



  
  