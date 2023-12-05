import axios from 'axios';
import {handleError} from '../../server/handleError';
import SERVER from '../../server/server';
import {SET_AUTH, SET_DEALS, SET_EMAIL, SET_LOADING, SET_TOKEN, SET_USER} from '../types';

export const sendOTP = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/verify/send-email-otp', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_EMAIL,
                    payload: data.email,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });

export const verifyOTP = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/verify/verify-email-otp', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });

export const register = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/users/register', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_USER,
                    payload: res.data,
                });
                dispatch({
                    type: SET_TOKEN,
                    payload: res.data.token,
                });
                dispatch({
                    type: SET_AUTH,
                    payload: true,
                });
                SERVER.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });

export const getDeals = dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.get('/deals')
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_DEALS,
                    payload: res.data,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });
};

export const getChat = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        const headers = {
            'x-api-key': 'ask_653c2ceba8aaeb889196dd42cc824a01',
            'Content-Type': 'application/json',
        };

        axios
            .post(`https://api.askyourpdf.com/v1/chat/${data.docID}`, data.msg, {
                headers: headers,
            })
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(handleError(dispatch, response.status));
                }
            })
            .catch(error => {
                console.error(error);
                reject(handleError(dispatch, error));
            });
    });
};

export const initSign = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/sign/init', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });

export const getSignAbility = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/sign/get-sign-ability', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });

export const getEnvolope = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        SERVER.post('/sign/get-envolope', data)
            .then(res => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch(err => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(dispatch, err));
            });
    });
