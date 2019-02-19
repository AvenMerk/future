import React, { Component } from 'react';
import './App.css';
import SmallTable from './container/smallTable';
import FullTable from './container/fullTable';


class App extends Component {
  render() {
    return (
      <div className="App">
       <SmallTable/>
       {/*<FullTable/>*/}
      </div>
    );
  }
}

export default App;
