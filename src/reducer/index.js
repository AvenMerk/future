import {RECEIVE_DATA, REQUEST_DATA, SELECT_MODE, SEARCH_FIELD } from "../action/index";
import { combineReducers } from 'redux';
import { SMALL } from '../container/searchContainer';

const selectedMode = (state = SMALL, action) => {
    switch (action.type) {
        case SELECT_MODE:
            return action.mode;
        default:
            return state;
    }
};

const tableDataReducer = (state = {isFetching: false, data: []}, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DATA:
            return {
                ...state,
                isFetching: false,
                data: action.data,
                lastUpdated: action.receivedAt
            };
        default:
            return state
    }
};

const searchedField = (state = "", action) => {
    switch (action.type) {
        case SEARCH_FIELD:
            return action.substring;
        default:
            return state;
    }
};

export default combineReducers({
    tableDataReducer,
    selectedMode,
    searchedField,
})