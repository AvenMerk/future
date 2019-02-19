import {RECEIVE_SMALL, REQUEST_SMALL} from "../action/index";

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


export default combineReducers({
    smallReducer,
})