import React, {useCallback, useEffect} from 'react';
import Navigator from './navigator/navigator';
import {Spinner} from './components/Spinner';
import {useSelector} from 'react-redux';
import SERVER from './server/server';
import {useStripe} from '@stripe/stripe-react-native';
import {Linking} from 'react-native';

export const AppRoot = () => {
    const loading = useSelector(state => state.loading);
    const loadingText = useSelector(state => state.loadingText);
    const token = useSelector(state => state.token);

    useEffect(() => {
        if (token) {
            SERVER.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const {handleURLCallback} = useStripe();

    const handleDeepLink = useCallback(
        async url => {
            if (url) {
                const stripeHandled = await handleURLCallback(url);
                if (stripeHandled) {
                    // This was a Stripe URL - you can return or add extra handling here as you see fit
                } else {
                    // This was NOT a Stripe URL – handle as you normally would
                }
            }
        },
        [handleURLCallback],
    );

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            handleDeepLink(initialUrl);
        };

        getUrlAsync();

        const deepLinkListener = Linking.addEventListener('url', event => {
            handleDeepLink(event.url);
        });

        return () => deepLinkListener.remove();
    }, [handleDeepLink]);

    return (
        <>
            <Navigator />
            <Spinner visible={loading} loadingText={loadingText} />
        </>
    );
};
