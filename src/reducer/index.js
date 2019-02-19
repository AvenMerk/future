import {RECEIVE_SMALL, REQUEST_SMALL} from "../action/index";
import {RECEIVE_FULL, REQUEST_FULL} from "../action/index";
import { combineReducers } from 'redux';

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
})