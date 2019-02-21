import React from 'react';
import { fetchData } from '../action/index';
import { connect } from 'react-redux';
import TableStroke from "../components/tableStroke";
import Button from "../components/button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Description from '../components/description';

class TableContainer extends React.Component {

    state = {
        currentPage: 0,
        showFields: 50,
        numberOfPages: 20,
        pages: [],
    };

    componentDidMount() {
        const { dispatch, selectedMode } = this.props;
        dispatch(fetchData(selectedMode));
        this.setNumberOfPages();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedMode !== this.props.selectedMode) {
            const { dispatch, selectedMode } = this.props;
            dispatch(fetchData(selectedMode));
            this.setNumberOfPages();
        }
    }

    //TODO сделать расчет страниц при выборе большого объема данных
    setNumberOfPages = () => {
        let pages = [];
        for (let i = 1; i <= this.state.numberOfPages; i++) {
            pages.push(i);
        }
        this.setState({pages});
    };

    changePage = (e) => {
        this.setState({currentPage: parseInt(e.target.innerText) - 1});
    };

    mapdata = (data) => {
        const { currentPage, showFields } = this.state;
        const beginning = currentPage*showFields;
        const end = (currentPage + 1)*showFields;
        const newData = data.slice(beginning, end);
        return newData.map((data, index) =>
                <TableStroke data={data} key={index} />
        );
    };

    filterArray = (e) => {
        const id = e.target.getAttribute('id');
        console.log(id);
        if (this.state[`filtered${id}`]) {
            this.setState({[`filtered${id}`]: false});
            if (this.state.currentArray) {
                const ar = this.state.currentArray.sort((a,b) => (a[`${id}`] < b[`${id}`]) ? 1
                    : ((b[`${id}`] < a[`${id}`]) ? -1 : 0));
                this.setState({currentArray: ar});
                this.mapdata(ar);
            } else {
                const ar = this.props.data.sort((a,b) => (a[`${id}`] < b[`${id}`]) ? 1
                    : ((b[`${id}`] < a[`${id}`]) ? -1 : 0));
                this.setState({currentArray: ar});
                this.mapdata(ar);
            }
        } else {
            this.setState({[`filtered${id}`]: true});
            if (this.state.currentArray) {
                const ar = this.state.currentArray.sort((a,b) => (a[`${id}`] > b[`${id}`]) ? 1
                    : ((b[`${id}`] > a[`${id}`]) ? -1 : 0));
                this.setState({currentArray: ar});
                this.mapdata(ar);
            } else {
                const ar = this.props.data.sort((a,b) => (a[`${id}`] > b[`${id}`]) ? 1
                    : ((b[`${id}`] > a[`${id}`]) ? -1 : 0));
                this.setState({currentArray: ar});
                this.mapdata(ar);
            }
        }
    };

    searchingField = (array) => {
        if (this.props.searchedField === "") {
            return true;
        } else {
            const { id, firstName, lastName, email, phone } = array;
            console.log(id);
            // const { array } = this.state.currentArray;
            return id.includes(this.props.searchedField);
        }
    };

    moreInfo = (data) => {
        return <Description data={data} />
    };

    render() {
        const {data, isFetching} = this.props;
        const isEmpty = data.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <Grid item xs={9}>
                        Loading...</Grid> : <Grid item xs={9}>Empty.</Grid>)
                : <Grid item xs={9}>
                    <h2>Table</h2>
                    {this.state.pages.map((page, index) =>
                        <Button name={page} onClick={this.changePage} key={index}/>
                    )}
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

                    {this.mapdata(data)}
                </Grid>
            }
        </React.Fragment>;
    }
}

// Функция, определяет что передать из редьюсера в props компоненты
const mapStateToProps = state => {
    console.log('=====>', state);
    const {tableDataReducer, selectedMode, searchedField} = state;
    const {
        isFetching,
        lastUpdated,
        data
    } = tableDataReducer || {isFetching: true, data: []};

    return {
        isFetching,
        data,
        lastUpdated,
        selectedMode,
        searchedField
    }
};

export default connect(mapStateToProps)(TableContainer);