import React, {useState} from 'react';
import {View} from 'react-native';
import {
    makeStyles,
    Text,
    Button,
    useThemeMode,
    Divider,
    useTheme,
    Image,
} from '@rneui/themed';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import GoogleDisableImg from '../assets/google_disable.png';
import GoogleImg from '../assets/google.png';
import {STYLES} from '../global/styles';

export default function LoginScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const {setMode, mode} = useThemeMode();
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');

    const onGoogleSignin = () => {
        // setMode(mode === 'dark' ? 'light' : 'dark');
    };

    const onEmailSignin = () => {
        navigation.navigate('Verify');
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image
                    source={require('../assets/appname.png')}
                    style={{width: 200, height: 80, resizeMode: 'contain'}}
                />
                <Text h4>Log in / Sign up</Text>
                <Text style={styles.text}>
                    Enter your email to receive a Login PIN. Then log in to set
                    up an account or use your existing account.
                </Text>
                <Input
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={STYLES.wFull}>
                    <View style={[STYLES.row, STYLES.mb12]}>
                        <Checkbox
                            color={
                                checked
                                    ? theme.colors.primary
                                    : theme.colors.grey4
                            }
                            value={checked}
                            onValueChange={setChecked}
                        />
                        <Text style={STYLES.ml12}>
                            I agree to the Terms & Conditions of{' '}
                            <Text style={styles.textTerms}>
                                Terms of Use & Privacy Policy
                            </Text>
                        </Text>
                    </View>

                    <Button
                        size="md"
                        onPress={onEmailSignin}
                        disabled={!checked || !email}>
                        Sign In
                    </Button>
                    <Divider style={[STYLES.mv12, STYLES.mh12]} />
                    <Button
                        size="md"
                        onPress={onGoogleSignin}
                        disabled={!checked}
                        icon={
                            <Image
                                source={!checked ? GoogleDisableImg : GoogleImg}
                                style={styles.googleIcon}
                            />
                        }
                        titleStyle={useCustomButtonStyle(!checked).titleStyle}
                        containerStyle={
                            useCustomButtonStyle(!checked).containerStyle
                        }
                        color={
                            !checked
                                ? theme.colors.disabled
                                : theme.colors.greyOutline
                        }>
                        Continue with Google
                    </Button>
                </View>
            </View>
        </View>
    );
}

const useCustomButtonStyle = makeStyles((theme, disabled) => ({
    titleStyle: {
        color: disabled ? theme.colors.grey3 : theme.colors.grey0,
        marginLeft: theme.spacing.sm,
    },
    containerStyle: {
        backgroundColor: disabled ? theme.colors.disabled : theme.colors.grey3,
    },
}));

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
