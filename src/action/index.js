export const REQUEST_SMALL = 'REQUEST_SMALL';
export const RECEIVE_SMALL = 'RECEIVE_SMALL';

export const requestSmall = () => ({
    type: REQUEST_SMALL
});

export const receiveSmall = (json) => ({
    type: RECEIVE_SMALL,
    smallData: json,
    receivedAt: Date.now()
});

export const fetchSmallData = () => (dispatch) => {
    dispatch(requestSmall());
    return fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
        .then(
            response => response.json(),
            error => console.log("Something went wrong", error)
        )
        .then(json => dispatch(receiveSmall(json)))
};