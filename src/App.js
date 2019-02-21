import React, {Component} from 'react';
import './App.css';
import FullTable from './container/fullTable';
import SearchContainer from './container/searchContainer';

export default class App extends Component {
    render() {
        return (
            <div className="aero-flex-container">
                <FullTable/>
                <SearchContainer/>
            </div>
        );
    }
}
