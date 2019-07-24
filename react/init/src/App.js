import React from 'react';
import './App.css';

import Page1 from "./pages/pages1"
import Page2 from "./pages/pages2"

class App extends React.Component {

  render(){
    return (
      <React.Fragment>
        <Page1></Page1>
        <div>========================================</div>
        {/* <Page2></Page2> */}
      </React.Fragment>
    )
  }
}



export default App
