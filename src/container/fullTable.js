import React from 'react';
import { fetchData } from '../action/index';
import { connect } from 'react-redux';
import TableStroke from "../components/tableStroke";
import Button from "../components/button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



class FullTable extends React.Component {

    state = {
        currentPage: 0,
        showFields: 50,
        pages: [],
    };

    componentDidMount() {
        const { dispatch, selectedMode } = this.props;
        dispatch(fetchData(selectedMode));
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.selectedMode !== this.props.selectedMode) {
    //         const { dispatch, selectedMode } = this.props;
    //         dispatch(fetchData(selectedMode))
    //     }
    // }

    //TODO сделать расчет страниц при выборе большого объема данных
    setNumberOfPages = () => {
        const numberOfPages = this.props.fullData.length / this.state.showFields;
        console.log(numberOfPages);
        let pages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i);
        }
        this.setState({pages: pages});
        console.log(this.state.pages);

    };

    changePage = (e) => {
        this.setState({currentPage: this.state.currentPage + 1});
        console.log(parseInt(e.target.innerText));
    };

    mapFullData = (fullData) => {
        const { currentPage, showFields } = this.state;
        const beginning = currentPage*showFields;
        const end = (currentPage + 1)*showFields;
        const newData = fullData.slice(beginning, end);
        return newData.map((data, index) =>
            <TableStroke key={index} data={data}/>
        );
    };

    filterArray = (e) => {
        const id = e.target.getAttribute('id');
        console.log(id);
        const ar = this.props.fullData.sort((a,b) => (a[`${id}`] > b[`${id}`]) ? 1
            : ((b[`${id}`] > a[`${id}`]) ? -1 : 0));
        console.log(this.props.fullData);
        this.setState({currentArray: ar});
        this.mapFullData(ar);
    };

    render() {
        const {fullData, isFetching} = this.props;
        const isEmpty = fullData.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <Grid item xs={9}>
                        Loading...</Grid> : <Grid item xs={9}>Empty.</Grid>)
                : <Grid item xs={9}>
                    <h2>Table</h2>
                    <Button name="Create array" onClick={this.setNumberOfPages}/>
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

                    {this.mapFullData(fullData)}
                </Grid>
            }
        </React.Fragment>;
    }
}

// Функция, определяет что передать из редьюсера в props компоненты
const mapStateToProps = state => {
    const {fullReducer, selectedMode} = state;
    const {
        isFetching,
        lastUpdated,
        fullData
    } = fullReducer || {isFetching: true, fullData: []};

    return {
        isFetching,
        fullData,
        lastUpdated,
        selectedMode
    }
};

// props из редьюсера мапятся в компоненту в этом методе
export default connect(mapStateToProps)(FullTable);
