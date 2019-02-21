import { FULL } from '../container/searchContainer';

export const REQUEST_SMALL = 'REQUEST_SMALL';
export const RECEIVE_SMALL = 'RECEIVE_SMALL';
export const REQUEST_FULL = 'REQUEST_FULL';
export const RECEIVE_FULL = 'RECEIVE_FULL';
export const SELECT_MODE = 'SELECT_MODE';

export const selectMode = mode => {
    return {
        type: SELECT_MODE,
        mode
    }
};

export const requestSmall = () => ({
    type: REQUEST_SMALL
});

export const receiveSmall = (json) => ({
    type: RECEIVE_SMALL,
    smallData: json,
    receivedAt: Date.now()
});

export const requestFull = () => ({
    type: REQUEST_FULL
});

export const receiveFull = (json) => ({
    type: RECEIVE_FULL,
    fullData: json,
    receivedAt: Date.now()
});

export const fetchData = (mode) => (dispatch) => {
    switch (mode) {
        case FULL:
            dispatch(requestFull());
            return fetch(`http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
                .then(
                    response => response.json(),
                    error => console.log("Something went wrong", error)
                )
                .then(json => dispatch(receiveFull(json)));
        default:
            dispatch(requestSmall());
            return fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
                .then(
                    response => response.json(),
                    error => console.log("Something went wrong", error)
                )
                .then(json => dispatch(receiveSmall(json)));
    }
};

// export const fetchFullData = () => (dispatch) => {
//     dispatch(requestFull());
//     return fetch(`http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
//         .then(
//             response => response.json(),
//             error => console.log("Something went wrong", error)
//         )
//         .then(json => dispatch(receiveFull(json)))
// };