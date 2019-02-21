import React, { Component } from 'react';
import './App.css';
import SmallTable from './container/smallTable';
import FullTable from './container/fullTable';
import SearchContainer from './container/searchContainer';
import { connect } from 'react-redux';

import { SMALL } from './container/searchContainer';

class App extends Component {

    switchMode = () => {
        switch (this.props.selectedMode) {
            case SMALL:
                return (
                    <SmallTable/>
                );
            default:
                return (
                    <FullTable/>
                );
        }
    };

  render() {
      return (
          <div className="aero-flex-container">
              {this.switchMode()}
              <SearchContainer/>
          </div>
      );
  }
}

const mapStateToProps = state => {
    const { selectedMode } = state;
    return { selectedMode }
};

export default connect(mapStateToProps)(App);
