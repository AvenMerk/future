import {RECEIVE_SMALL, REQUEST_SMALL, SELECT_MODE} from "../action/index";
import {RECEIVE_FULL, REQUEST_FULL} from "../action/index";
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

const smallReducer = (state = {isFetching: false, smallData: []}, action) => {
    switch (action.type) {
        case REQUEST_SMALL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_SMALL:
            return {
                ...state,
                isFetching: false,
                smallData: action.smallData,
                lastUpdated: action.receivedAt
            };
        default:
            return state
    }
};

const fullReducer = (state = {isFetching: false, fullData: []}, action) => {
    switch (action.type) {
        case REQUEST_FULL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_FULL:
            return {
                ...state,
                isFetching: false,
                fullData: action.fullData,
                lastUpdated: action.receivedAt
            };
        default:
            return state
    }
};

export default combineReducers({
    smallReducer,
    fullReducer,
    selectedMode,
})