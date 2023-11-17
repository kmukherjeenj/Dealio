import React from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {Button, Image, makeStyles, Text, useTheme} from '@rneui/themed';
import {STYLES} from '../global/styles';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {INVESTOR_TYPE} from '../constant/mock-data';
import {SET_LOG_OUT} from '../redux/types';

export default function ProfileScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={[STYLES.ph20, STYLES.sb, STYLES.alignC, STYLES.row]}>
                    <Text h4>Profile</Text>
                    <Button type="clear">
                        <Feather name="edit" size={24} color={theme.colors.grey0} />
                    </Button>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[STYLES.mt20, STYLES.alignC]}>
                        <Image source={require('../assets/avatar_1.jpg')} style={styles.avatar} />
                    </View>
                    <View>
                        <View style={[styles.fragment, STYLES.mt20]}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>Personal Information</Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>First Name</Text>
                                    <Text style={styles.valueText}>{user.firstName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>Last Name</Text>
                                    <Text style={styles.valueText}>{user.lastName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>Email</Text>
                                    <Text style={styles.valueText}>{user.email}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>WhatsApp/Mobile</Text>
                                    <Text style={styles.valueText}>{user.phone}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>Address</Text>
                                    <Text style={styles.valueText}>{user.address}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fragment}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>Company Information</Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>Company Name</Text>
                                    <Text style={styles.valueText}>Apex Solution</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>Investor Type</Text>
                                    {user.investorType?.map((item, index) => (
                                        <Text style={styles.investorTypeText} key={index}>
                                            - {INVESTOR_TYPE.filter(e => e.key === item)[0].value}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={styles.fragment}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>Account Setting</Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Button
                                        type="outline"
                                        buttonStyle={{borderWidth: 0}}
                                        containerStyle={{borderWidth: 1, borderColor: theme.colors.primary}}
                                        onPress={() => {
                                            dispatch({
                                                type: SET_LOG_OUT,
                                                payload: null,
                                            });
                                        }}>
                                        Log out
                                    </Button>
                                </View>
                                <View style={styles.row}>
                                    <Button color="error">Delete account</Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 200}} />
                </ScrollView>
            </View>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Platform.select({ios: 50, android: 20}),
    },
    body: {
        display: 'flex',
        width: '100%',
    },
    avatar: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 60,
    },
    fragment: {
        // marginBottom: theme.spacing.xl,
    },
    fragmentHeader: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
    },
    fragmentHeaderText: {
        color: theme.colors.white,
    },
    fragmentBody: {
        paddingHorizontal: theme.spacing.xl,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingVertical: theme.spacing.md,
    },
    captionText: {
        fontSize: 14,
        color: theme.colors.grey3,
    },
    valueText: {
        fontSize: 17,
        marginTop: theme.spacing.xs,
    },
    investorTypeText: {
        fontSize: 14,
        marginTop: theme.spacing.xs,
    },
}));
