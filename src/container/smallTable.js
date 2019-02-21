import React from 'react';
import {fetchData} from '../action/index';
import { connect } from 'react-redux';
import TableStroke from '../components/tableStroke';
import Grid from '@material-ui/core/Grid';

class SmallTable extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchData());
    }

    render() {
        const {smallData, isFetching} = this.props;
        const isEmpty = smallData.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <h2>
                        Loading...</h2> : <h2>Empty.</h2>)
                : <Grid item xs={9}>
                <h2>Table</h2>
                    {smallData.map((data, index) =>
                        <TableStroke key={index} data={data}/>
                        )
                    }
                </Grid>
            }
        </React.Fragment>;
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
