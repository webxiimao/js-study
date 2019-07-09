import React from 'react';
import logo from './logo.svg';
import './App.css';

import { initialState } from "./utils/initDom"



class Box extends React.Component {


  render(){

    const {setDecorator, getProp} = this.props.fields
    console.log(getProp('click'));
    
    return <Bar.Item>{setDecorator("click")(<Foo />)}</Bar.Item>
  }
}

class Foo extends React.Component {

  click = () => {
    
    this.props.click()
  }

  render(){
    const { value } = this.props
    return (
      <div>
        <input value={value} />
        <button onClick={()=>this.click()}>按他</button>
        <div>Foo</div>
        <input value={11}/>
        <div>Foo end</div>
      </div>
    )
  }
}

class BarItem extends React.Component {
  render(){
    
    return (
      <div>
        <div>this is baritem</div>
        {this.props.children}
      </div>
    )
  }
}

class Bar extends React.Component {
  name = "bar"

  constructor(props){
    super(props)
    console.log(Bar.fields);
    
  }

  static Item = BarItem

  saveData = () => {
    console.log("save data");
  }

  static create = (WrappedComponent) => {
    Bar.fields = initialState()
    return () => {
      return (
        <WrappedComponent fields={Bar.fields} />
      )
    }
  }

     
  fields = null
  
  handleClick = () => {
    console.log(this.name);
    
  }

  componentWillMount(){
    
    Bar.fields.setProps('saveData',this.saveData)
    Bar.fields.setProps('value',88)
    Bar.fields.setProps('click',this.handleClick)

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


class App extends React.Component {

  componentDidMount(){
    const { fields } = this.props
    
    fields.getProp('saveData')()
  }

  render(){
    const { fields } = this.props
    return (
      <Bar>
        <Box fields={fields}></Box>
      </Bar>
    )
  }
}

export default Bar.create(App);
