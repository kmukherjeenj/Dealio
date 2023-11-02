import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import VerifyScreen from '../screens/Verify';
import EditAccountScreen from '../screens/EditAccount';
import DealDetailScreen from '../screens/DealDetail';
import RootNavigator from './root';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Verify" component={VerifyScreen} />
                <Stack.Screen
                    name="EditAccount"
                    component={EditAccountScreen}
                />
                <Stack.Screen name="HomeNav" component={RootNavigator} />
                <Stack.Screen name="DealDetail" component={DealDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
