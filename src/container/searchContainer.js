import React from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import { connect } from 'react-redux';
import { selectMode, searchField } from '../action';

export const SMALL = 'REQUEST_SMALL';
export const FULL = 'REQUEST_FULL';

class SearchContainer extends React.Component {

    changeMode = event => this.props.dispatch(selectMode(event.target.value));

    searchingField = event => this.props.dispatch(searchField(event.target.value));

    render() {
        return (
            <React.Fragment>
                <Grid item xs={3}>
                    <div className="aero-search-container aero-full-height">
                        <div className="aero-tab">
                            <div>
                                <p className="aero-add-zero-margin aero-centred">Фильтр</p>
                            </div>
                            <form className="aero-radio-container">
                                <Radio
                                    checked={this.props.selectedMode === SMALL}
                                    onChange={this.changeMode}
                                    value={SMALL}
                                    name="radio-button-demo"
                                    color="primary"
                                />
                                <label>SMALL</label><br />
                                <Radio
                                    checked={this.props.selectedMode === FULL}
                                    onChange={this.changeMode}
                                    value={FULL}
                                    name="radio-button-demo"
                                    color="primary"
                                />
                                <label>FULL</label><br />
                            </form>

                            <div className="aero-search-field-container">
                                <InputBase placeholder="Поиск"
                                           className="aero-search-input-field"
                                           onChange={this.searchingField}
                                />
                                <IconButton aria-label="Search">
                                    <SearchIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { selectedMode, searchedField } = state;
    return {
        selectedMode,
        searchedField
    };
};

export default connect(mapStateToProps)(SearchContainer);