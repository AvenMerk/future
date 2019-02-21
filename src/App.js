import React, {Component} from 'react';
import './App.css';
import FullTable from './container/tableContainer';
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
