import axios from 'axios';
import {SERVER_URL} from './constant';

const SERVER = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
});

export default SERVER;
