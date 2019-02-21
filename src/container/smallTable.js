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

    filterArray = (e) => {
        const id = e.target.getAttribute('id');
        console.log(id);
        const ar = this.props.smallData.sort((a,b) => (a[`${id}`] > b[`${id}`]) ? 1
            : ((b[`${id}`] > a[`${id}`]) ? -1 : 0));
        this.setState({currentArray: ar});
        console.log(ar);
        this.renderArray(ar);
    };

    renderArray = (smallData) => {
        return smallData.map((data, index) =>
            <TableStroke key={index} data={data}/>
        )
    };

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
                        <Grid item xs={1}>
                            <p className="aero-centred"
                               id='id'
                               onClick={this.filterArray}>
                                ID
                            </p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className="aero-centred"
                               id='firstName'
                               onClick={this.filterArray}>
                                First Name
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='lastName'
                               onClick={this.filterArray}>
                                Last Name
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='email'
                               onClick={this.filterArray}>
                                Email
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='phone'
                               onClick={this.filterArray}>
                                Phone
                            </p>
                        </Grid>
                    </Paper>
                    {this.renderArray(smallData)}
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
