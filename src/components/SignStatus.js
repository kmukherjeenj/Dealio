import React from 'react';
import {Text, makeStyles} from '@rneui/themed';
import {View} from 'react-native';

const SignStatus = ({value}) => {
    const styles = useStyles();
    const status = value.charAt(0).toUpperCase() + value.slice(1);

    if (value === 'draft' || value === 'sent') {
        return (
            <View style={styles.draft}>
                <Text style={styles.text}>{status}</Text>
            </View>
        );
    } else if (value === 'delivered') {
        return (
            <View style={styles.delivered}>
                <Text style={styles.text}>{status}</Text>
            </View>
        );
    } else if (value === 'declined' || value === 'voided' || value === 'expired') {
        return (
            <View style={styles.declined}>
                <Text style={styles.text}>{status}</Text>
            </View>
        );
    } else if (value === 'completed') {
        return (
            <View style={styles.completed}>
                <Text style={styles.text}>{status}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.other}>
                <Text style={styles.text}>{status}</Text>
            </View>
        );
    }
};

const useStyles = makeStyles(theme => ({
    container: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderRadius: 30,
    },
    completed: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.success,
        borderRadius: 30,
    },
    draft: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.warning,
        borderRadius: 30,
    },
    delivered: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7775F6',
        borderRadius: 30,
    },
    declined: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.error,
        borderRadius: 30,
    },
    other: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.grey0,
        borderRadius: 30,
    },
    text: {
        color: 'white',
    },
}));

export default SignStatus;
