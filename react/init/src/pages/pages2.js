import React from 'react';
import Bar from "../component/Bar";


class Box extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    const { setProps } = this.props.fields
    setProps("component name","pages2")
    console.log("pages2",this.props.fields);

  }
  onclick = () => {
    const {  getProp } = this.props.fields
    console.log("pages2",getProp('component name'));
  }

  render(){
    const { setDecorator,getPropElement } = this.props.fields
    const BarItem = getPropElement('BarItem')

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
    
    this.props.click("page2")
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

  render(){
    const { fields } = this.props
    // const MyBar = fields.getPropElement('Bar')
    
    return (
      <Bar submit={this.onSubmit}>
        <Box fields={fields}></Box>
      </Bar>
    )
  }
}

export default Bar.create()(App)
