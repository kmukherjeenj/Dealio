import React, {useEffect, useState} from 'react';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {STYLES} from '../global/styles';
import SignStatus from '../components/SignStatus';
import {getEnvolope, initTransfer} from '../redux/action/action';
import Toast from 'react-native-toast-message';
import {useStripe} from '@stripe/stripe-react-native';

const WIDTH = Dimensions.get('screen').width;

export default function SignedScreen({navigation, route}) {
    const {theme} = useTheme();
    const styles = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {envelopeId, dealId, docId, docName, envelopeData} = route.params;

    const {initPaymentSheet, presentPaymentSheet} = useStripe();

    const [envelope, setEnvolope] = useState(envelopeData.status);

    useEffect(() => {
        if (envelopeData) {
            setEnvolope(envelopeData.status);
        }
    }, [envelopeData]);

    useEffect(() => {
        if (envelope.status === 'completed') {
            initializePaymentSheet();
        }
    }, [envelope]);

    // useEffect(() => {
    //     if (envelopeId) {
    //         let interval = setInterval(() => {
    //             getEnvolope(dispatch, {envelopeId: envelopeId, dealId: dealId, docId: docId, userId: user.id})
    //                 .then(resEnvelop => {
    //                     setEnvolope(resEnvelop.status);
    //                 })
    //                 .catch(errEvelope => {
    //                     // Toast.show({
    //                     //     type: 'error',
    //                     //     text1: 'Error',
    //                     //     text2: errEvelope,
    //                     // });
    //                 });
    //         }, 5000);

    //         return () => {
    //             clearInterval(interval);
    //         };
    //     }
    // }, [envelopeId]);

    const goBack = () => {
        navigation.goBack();
    };

    const initializePaymentSheet = async () => {
        const {paymentIntent, ephemeralKey, customer, publishableKey} = await initTransfer(dispatch);

        const {error} = await initPaymentSheet({
            merchantDisplayName: 'Deelio.',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            returnURL: 'your-app://stripe-redirect',
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: `${user.firstName} ${user.lastName}`,
            },
        });
    };

    const openPaymentSheet = async () => {
        const {error} = await presentPaymentSheet();

        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
            initializePaymentSheet();
        } else {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your order is confirmed!',
            });
            initializePaymentSheet();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.statusCard}>
                    <Text style={styles.captionText}>Document</Text>
                    <Text style={styles.valueText}>{docName}</Text>
                </View>
                <View style={styles.statusCard}>
                    <Text style={styles.captionText}>Signature</Text>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowValue}>Status</Text>
                        <SignStatus value={envelope.status} />
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Sent</Text>
                        <Text style={styles.rowValue}>{new Date(envelope.sentDateTime).toLocaleString()}</Text>
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Updated</Text>
                        <Text style={styles.rowValue}>{new Date(envelope.lastModifiedDateTime).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={[styles.statusCard, STYLES.mb12]}>
                    <Text style={styles.captionText}>Sender</Text>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Name</Text>
                        <Text style={styles.rowValue}>{envelope.sender.userName}</Text>
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Email</Text>
                        <Text style={styles.rowValue}>{envelope.sender.email}</Text>
                    </View>
                </View>
                {/* <View style={styles.dealButton}>
                    <Text style={styles.dealButtonText}>Resend Sign Request</Text>
                </View> */}
                <View>
                    <Text style={{fontSize: 12, color: theme.colors.grey3}}>*We send only 1.00 USD for a payment.</Text>
                    <Text style={{fontSize: 12, color: theme.colors.grey3}}>*This is a sandbox mode, so all transactions are fake now.</Text>
                    <Text style={{fontSize: 12, color: theme.colors.grey3}}>*Use user name 'user_good' and password 'pass_good' for login.</Text>
                    <Text style={{fontSize: 12, color: theme.colors.grey3}}>*Use random number for all two factor codes.</Text>
                </View>
                {envelope.status === 'completed' && (
                    <TouchableOpacity style={styles.dealButton} onPress={openPaymentSheet}>
                        <Text style={styles.dealButtonText}>Pay Now</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        paddingTop: Platform.select({ios: 56, android: theme.spacing.xl}),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.greyOutline,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
        elevation: 11,
        backgroundColor: theme.colors.white,
    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#00000058',
    },
    body: {
        flex: 1,
        paddingTop: theme.spacing.md,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    statusCard: {
        backgroundColor: theme.colors.white,
        width: '100%',
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        marginVertical: theme.spacing.sm,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.053,
        shadowRadius: 2.62,
        elevation: 2,
    },
    captionText: {
        fontSize: 14,
        marginBottom: theme.spacing.md,
        // color: '#303030',
        color: theme.colors.primary,
    },
    valueText: {
        fontSize: 16,
        color: '#191919',
    },
    rowTitle: {
        color: theme.colors.grey1,
    },
    rowValue: {
        color: theme.colors.grey0,
    },
    dealButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH * 0.9,
        height: 44,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        marginVertical: theme.spacing.md,
    },
    dealButtonText: {
        fontSize: 16,
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: theme.spacing.sm,
    },
}));
