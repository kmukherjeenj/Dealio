import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import RootNavigator from './root';
import LoginScreen from '../screens/Login';
import VerifyScreen from '../screens/Verify';
import EditAccountScreen from '../screens/EditAccount';
import DealDetailScreen from '../screens/DealDetail';
import PDFViewer from '../screens/PDFViewer';
import SignedScreen from '../screens/Signed';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const authed = useSelector(state => state.authed);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {authed ? (
                    <>
                        <Stack.Screen name="HomeNav" component={RootNavigator} />
                        <Stack.Screen name="DealDetail" component={DealDetailScreen} />
                        <Stack.Screen name="PDFViewer" component={PDFViewer} />
                        <Stack.Screen name="Signed" component={SignedScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Verify" component={VerifyScreen} />
                        <Stack.Screen name="EditAccount" component={EditAccountScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
