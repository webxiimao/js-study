import React from 'react';
import Bar from "../component/Bar";


class Box extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
      const { setProps } = this.props.fields
      setProps("component name","pages1")
      
  }

  onclick = () => {
    const {  getProp } = this.props.fields
    console.log("pages1",getProp('component name'));
  }

  render(){
    const { setDecorator, getPropElement } = this.props.fields
    const BarItem = getPropElement('BarItem')
    console.log(BarItem);
    
    return (
        <React.Fragment>
            <button onClick={this.onclick}>测试fields共享</button>
            <BarItem>
                <Foo />
            </BarItem>
        </React.Fragment>
    )
  }
}

class Foo extends React.Component {

  click = () => {
    
    this.props.click("page1")
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



class App extends React.Component {

  componentDidMount(){
    const { fields } = this.props
    
    fields.getProp('saveData')()
  }

  onSubmit = () => {
      console.log("page1 submit!");
      
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

export default Bar.create()(App)
