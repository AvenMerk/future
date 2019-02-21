import React from 'react';
import {fetchData} from '../action/index';
import { connect } from 'react-redux';
import TableStroke from '../components/tableStroke';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
                    <Paper className="aero-flex">
                        <Grid item xs={1}><p className="aero-centred">ID</p></Grid>
                        <Grid item xs={2}><p className="aero-centred">First Name</p></Grid>
                        <Grid item xs={3}><p className="aero-centred">Last Name</p></Grid>
                        <Grid item xs={3}><p className="aero-centred">Email</p></Grid>
                        <Grid item xs={3}><p className="aero-centred">Phone</p></Grid>
                    </Paper>
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
