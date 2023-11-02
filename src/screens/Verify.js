import React, {useState} from 'react';
import {View} from 'react-native';
import {makeStyles, Text, Button, Image} from '@rneui/themed';
import Input from '../components/Input';
import {STYLES} from '../global/styles';

export default function VerifyScreen({navigation}) {
    const styles = useStyles();
    const [code, setCode] = useState('');

    const onResend = () => {
        // setMode(mode === 'dark' ? 'light' : 'dark');
    };

    const onSignin = () => {
        navigation.navigate('EditAccount');
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image
                    source={require('../assets/appname.png')}
                    style={{width: 200, height: 80, resizeMode: 'contain'}}
                />
                <Text h4>Check your email</Text>
                <Text style={styles.text}>
                    We've sent a pin to apexcup199096@gmail.com
                </Text>
                <Input
                    placeholder="00000"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="numeric"
                />
                <View style={STYLES.wFull}>
                    <Button
                        size="md"
                        onPress={onSignin}
                        disabled={code.length < 5}>
                        Sign In
                    </Button>
                    <Button
                        size="md"
                        type="clear"
                        onPress={onResend}
                        containerStyle={STYLES.mt12}>
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
}));
