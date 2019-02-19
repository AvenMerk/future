import React from 'react';
import { fetchFullData } from '../action/index';
import { connect } from 'react-redux';
import TableStroke from "../components/tableStroke";

class FullTable extends React.Component {

    state = {
        currentPage: 0,
        showFields: 50,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFullData());
    }

    mapFullData = (fullData) => {
        const { currentPage, showFields } = this.state;
        const beginning = currentPage*showFields;
        const end = (currentPage + 1)*showFields;
        const newData = fullData.slice(beginning, end);
        console.log(newData);
        return newData.map((data, index) =>
            <TableStroke key={index} data={data}/>
        );
    };

    render() {
        const {fullData, isFetching} = this.props;
        const isEmpty = fullData.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <h2>
                        Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <h2>Table</h2>
                    {this.mapFullData(fullData)}
                </div>
            }
        </React.Fragment>;
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
