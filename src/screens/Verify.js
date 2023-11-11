import React, {useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {makeStyles, Text, Button, Image, useTheme} from '@rneui/themed';
import Input from '../components/Input';
import {STYLES} from '../global/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sendOTP, verifyOTP} from '../redux/action/action';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {SET_AUTH, SET_TOKEN, SET_USER} from '../redux/types';
import SERVER from '../server/server';

export default function VerifyScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const [code, setCode] = useState('');

    const onBack = () => {
        navigation.goBack();
    };

    const onResend = () => {
        sendOTP(dispatch, {email})
            .then(res => {
                if (res.success) {
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: res.message,
                    });
                }
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err,
                });
            });
    };

    const onSignin = () => {
        verifyOTP(dispatch, {email, otp: code})
            .then(res => {
                if (res.success) {
                    if (res.data) {
                        dispatch({
                            type: SET_USER,
                            payload: res.data,
                        });
                        dispatch({
                            type: SET_AUTH,
                            payload: true,
                        });
                        dispatch({
                            type: SET_TOKEN,
                            payload: res.token,
                        });
                        SERVER.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
                        navigation.navigate('HomeNav');
                    } else {
                        navigation.navigate('EditAccount');
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: res.message,
                    });
                }
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err,
                });
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
            </TouchableOpacity>
            <View style={styles.body}>
                <Image source={require('../assets/appname.png')} style={{width: 160, height: 60, resizeMode: 'contain'}} />
                <Text h4>Check your email</Text>
                <Text style={styles.text}>We've sent a pin to {email}.</Text>
                <Input placeholder="0000" value={code} onChangeText={setCode} keyboardType="numeric" />
                <View style={STYLES.wFull}>
                    <Button size="md" onPress={onSignin} disabled={code.length < 4}>
                        Sign In
                    </Button>
                    <Button size="md" type="clear" onPress={onResend} containerStyle={STYLES.mt12}>
                        I need another pin
                    </Button>
                </View>
            </View>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.lg,
    },
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        marginVertical: theme.spacing.lg,
        textAlign: 'center',
    },
    textTerms: {
        textDecorationLine: 'underline',
    },
    googleIcon: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: Platform.select({ios: 60, android: 26}),
        left: theme.spacing.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#00000058',
    },
}));
