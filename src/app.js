import React, {useEffect} from 'react';
import Navigator from './navigator/navigator';
import {Spinner} from './components/Spinner';
import {useSelector} from 'react-redux';
import SERVER from './server/server';

export const AppRoot = () => {
    const loading = useSelector(state => state.loading);
    const token = useSelector(state => state.token);

    useEffect(() => {
        if (token) {
            SERVER.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    return (
        <>
            <Navigator />
            <Spinner visible={loading} />
        </>
    );
};
