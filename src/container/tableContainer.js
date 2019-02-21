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

    setNumberOfPages = () => {
        const { isFetching, data } = this.props;
        if (!isFetching) {
            this.setState({numberOfPages: Math.ceil(data.length/50)});
        }
    };

    getPagingButtons = () => {
        const pages = [];
        for (let i = 1; i<= this.state.numberOfPages; i++) {
            pages.push(<Button name={i} onClick={this.changePage} key={i}/>)
        }
        return pages;
    };

    changePage = (e) => this.setState({currentPage: parseInt(e.target.innerText) - 1});

    mapData = (data) => {
        const { currentPage, showFields } = this.state;
        const beginning = currentPage*showFields;
        const end = (currentPage + 1)*showFields;
        const newData = data.slice(beginning, end);
        return newData.map((data, index) =>
                <TableStroke data={data} key={index} />
        );
    };

    filterArray = (fieldName) => (e) => {
        console.log(fieldName);
        const sort = (cmpFn, array) => {
            this.setState({currentArray: array.sort(cmpFn)});
            this.mapData(array);
        };

        if (this.state[`filtered${fieldName}`]) {
            this.setState({[`filtered${fieldName}`]: false});
            const cmpFn = (a,b) => (a[`${fieldName}`] < b[`${fieldName}`]) ? 1 : ((b[`${fieldName}`] < a[`${fieldName}`]) ? -1 : 0);
            if (this.state.currentArray) {
                sort(cmpFn, this.state.currentArray)
            } else {
                sort(cmpFn, this.props.data)
            }
        } else {
            this.setState({[`filtered${fieldName}`]: true});
            const cmpFn = (a,b) => (a[`${fieldName}`] > b[`${fieldName}`]) ? 1 : ((b[`${fieldName}`] > a[`${fieldName}`]) ? -1 : 0);
            if (this.state.currentArray) {
                sort(cmpFn, this.state.currentArray)
            } else {
                sort(cmpFn, this.props.data)
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
        const {numberOfPages} = this.state;
        const isEmpty = data.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <Grid item xs={9}>
                        Loading...</Grid> : <Grid item xs={9}>Empty.</Grid>)
                : <Grid item xs={9}>
                    <h2>Table</h2>
                    {numberOfPages !== 0 && this.getPagingButtons()}
                    <Paper className="aero-flex">
                        <Grid item xs={1}>
                            <p className="aero-centred"
                               id='id'
                               onClick={this.filterArray('id')}>
                                ID
                            </p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className="aero-centred"
                               id='firstName'
                               onClick={this.filterArray('firstName')}>
                                First Name
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='lastName'
                               onClick={this.filterArray('lastName')}>
                                Last Name
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='email'
                               onClick={this.filterArray('email')}>
                                Email
                            </p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className="aero-centred"
                               id='phone'
                               onClick={this.filterArray('phone')}>
                                Phone
                            </p>
                        </Grid>
                    </Paper>

                    {this.mapData(data)}
                </Grid>
            }
        </React.Fragment>;
    }
}

// Функция, определяет что передать из редьюсера в props компоненты
const mapStateToProps = state => {
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

// TODO разобратся со списком страниц