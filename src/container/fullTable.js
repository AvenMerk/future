import React from 'react';
import { fetchData } from '../action/index';
import { connect } from 'react-redux';
import TableStroke from "../components/tableStroke";
import Button from "../components/button";
import Grid from '@material-ui/core/Grid';


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

    changePage = () => {
        this.setState({currentPage: this.state.currentPage + 1});
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

    render() {
        const {fullData, isFetching} = this.props;
        const isEmpty = fullData.length === 0;
        return <React.Fragment>
            {isEmpty
                ? (isFetching ?
                    <h2>
                        Loading...</h2> : <h2>Empty.</h2>)
                : <Grid item xs={9}>
                    <h2>Table</h2>
                    <Button name="Create array" onClick={this.setNumberOfPages}/>
                    {this.state.pages.map((page, index) =>
                    <Button name={page} onClick={this.changePage} key={index}/>
                    )}

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