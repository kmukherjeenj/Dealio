import {SET_LOG_OUT} from '../redux/types';

export const handleError = (dispatch, error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error data : ', error.response);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status === 401) {
            dispatch({
                type: SET_LOG_OUT,
                payload: null,
            });
            return 'Unauthorized. Please login again!';
        }
        if (error.response.status === 400) {
            if (error.response.data?.message) {
                return error.response.data.message;
            } else {
                return 'Something went wrong, Please try again!';
            }
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('Error request: ', error.message);
        return 'Our server is not responding now.';
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message: ', error.message);
        return error.message;
    }
};
