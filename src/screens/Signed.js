import React from 'react';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import {Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {STYLES} from '../global/styles';
import SignStatus from '../components/SignStatus';

export default function SignedScreen({navigation, route}) {
    const {theme} = useTheme();
    const styles = useStyles();
    const user = useSelector(state => state.user);
    const {envelopeId, dealId, docId, docName, envelopeData} = route.params;
    // console.log('jere : ', envelopeData);
    const {sender, status, sentDateTime, lastModifiedDateTime} = envelopeData.status;

    const goBack = () => {
        navigation.goBack();
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
                        <SignStatus value={status} />
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Sent</Text>
                        <Text style={styles.rowValue}>{new Date(sentDateTime).toLocaleString()}</Text>
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Updated</Text>
                        <Text style={styles.rowValue}>{new Date(lastModifiedDateTime).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={styles.statusCard}>
                    <Text style={styles.captionText}>Sender</Text>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Name</Text>
                        <Text style={styles.rowValue}>{sender.userName}</Text>
                    </View>
                    <View style={[STYLES.row, STYLES.alignC, STYLES.sb, STYLES.mt6]}>
                        <Text style={styles.rowTitle}>Email</Text>
                        <Text style={styles.rowValue}>{sender.email}</Text>
                    </View>
                </View>
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
}));
