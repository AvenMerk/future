import React from 'react';
import {fetchFullData} from '../action/index';
import { connect } from 'react-redux';
import TableStroke from "./smallTable";

class FullTable extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFullData());
    }

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
                    {fullData.map((data, index) =>
                        <TableStroke key={index} data={data}/>
                    )
                    }
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
