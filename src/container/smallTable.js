import React from 'react';
import {fetchSmallData} from '../action/index';
import { connect } from 'react-redux';

class SmallTable extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSmallData());
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
    const {smallReducer} = state;
    const {
        isFetching,
        lastUpdated,
        smallData
    } = smallReducer || {isFetching: true, smallData: []};

    return {
        isFetching,
        smallData,
        lastUpdated,
    }
};

// props из редьюсера мапятся в компоненту в этом методе
export default connect(mapStateToProps)(SmallTable);


{/*{isEmpty*/}
{/*? (isFetching ?*/}
{/*<h2>*/}
{/*Loading...</h2> : <h2>Empty.</h2>)*/}
{/*: <div style={{opacity: isFetching ? 0.5 : 1}}>*/}
{/*<h2>Table</h2>*/}
{/*</div>*/}
{/*}*/}