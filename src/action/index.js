import { FULL } from '../container/searchContainer';

export const SELECT_MODE = 'SELECT_MODE';
export const SEARCH_FIELD = 'SEARCH_FIELD';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const selectMode = mode => {
    return {
        type: SELECT_MODE,
        mode
    }
};

export const searchField = substring => {
    return {
        type: SEARCH_FIELD,
        substring
    }
};

export const requestData = () => ({
    type: REQUEST_DATA
});

export const receiveData = (data) => ({
    type: RECEIVE_DATA,
    data,
    receivedAt: Date.now()
});

const getLink = (numberOfElements) =>  {
    return `http://www.filltext.com/?rows=${numberOfElements}&id={number|1000}&firstName={firstName}&lastName={lastName}
    &email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
};

export const fetchData = (mode) => (dispatch) => {
    dispatch(requestData());
    return fetch(mode === FULL ? getLink(1000) : getLink(32) )
        .then(
            response => response.json(),
            error => console.log("Something went wrong", error)
        )
        .then(json => dispatch(receiveData(json)));
};
