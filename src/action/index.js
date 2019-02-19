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
    return fetch(`https://api.fedor-bystrov.me/workshop/category/list`)
        .then(
            response => response.json(),
            error => console.log("Something went wrong", error)
        )
        .then(json => dispatch(receiveSmall(json)))
};