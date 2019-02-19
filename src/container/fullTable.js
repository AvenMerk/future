import React from 'react';
import {fetchFullData} from '../action/index';
import { connect } from 'react-redux';

class FullTable extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFullData());
    }

    render() {
        // const {smallData, isFetching} = this.props;
        // const isEmpty = smallData.length === 0;
        return <React.Fragment>
            <p>Table</p>
        </React.Fragment>
    }
}

// Функция, определяет что передать из редьюсера в props компоненты
const mapStateToProps = state => {
    const {fullReducer} = state;
    const {
        isFetching,
        lastUpdated,
        fullData
    } = fullReducer || {isFetching: true, fullData: []};

    return {
        isFetching,
        fullData,
        lastUpdated,
    }
};

// props из редьюсера мапятся в компоненту в этом методе
export default connect(mapStateToProps)(FullTable);
