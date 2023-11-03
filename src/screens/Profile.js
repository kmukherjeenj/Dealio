import React from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {Button, Image, makeStyles, Text, useTheme} from '@rneui/themed';
import {STYLES} from '../global/styles';
import Feather from 'react-native-vector-icons/Feather';

export default function ProfileScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View
                    style={[STYLES.ph20, STYLES.sb, STYLES.alignC, STYLES.row]}>
                    <Text h4>Profile</Text>
                    <Button type="clear">
                        <Feather
                            name="edit"
                            size={24}
                            color={theme.colors.grey0}
                        />
                    </Button>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[STYLES.mt20, STYLES.alignC]}>
                        <Image
                            source={require('../assets/avatar_1.jpg')}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <View style={[styles.fragment, STYLES.mt20]}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>
                                    Personal Information
                                </Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        First Name
                                    </Text>
                                    <Text style={styles.valueText}>Apex</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Last Name
                                    </Text>
                                    <Text style={styles.valueText}>Cup</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Email
                                    </Text>
                                    <Text style={styles.valueText}>
                                        apexcup199096@gmail.com
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        WhatsApp/Mobile
                                    </Text>
                                    <Text style={styles.valueText}>
                                        +1-2018971245
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Telegram
                                    </Text>
                                    <Text style={styles.valueText}>
                                        @apexcup
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        LinkedIn
                                    </Text>
                                    <Text style={styles.valueText}>
                                        https://linkedin.com/apexcup
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Hobbies and interests
                                    </Text>
                                    <Text style={styles.valueText}>
                                        Booking, Soccer, Driving
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fragment}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>
                                    Company Information
                                </Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Company Name
                                    </Text>
                                    <Text style={styles.valueText}>
                                        Apex Solution
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Company website URL
                                    </Text>
                                    <Text style={styles.valueText}>
                                        https://apexcup.com
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Job title
                                    </Text>
                                    <Text style={styles.valueText}>
                                        Looking for co-founder
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Short Bio
                                    </Text>
                                    <Text style={styles.valueText}>
                                        Apex Solution is a startup but fast
                                        growing IT solution company
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        City of residency
                                    </Text>
                                    <Text style={styles.valueText}>
                                        New York
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Country of residency
                                    </Text>
                                    <Text style={styles.valueText}>
                                        New York
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fragment}>
                            <View style={styles.fragmentHeader}>
                                <Text style={styles.fragmentHeaderText}>
                                    Investment Information
                                </Text>
                            </View>
                            <View style={styles.fragmentBody}>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Investor Type
                                    </Text>
                                    <Text style={styles.investorTypeText}>
                                        - Corporate VC - General Partner or
                                        Managing Partner or Partner (investing
                                        corporate capital)
                                    </Text>
                                    <Text style={styles.investorTypeText}>
                                        - Family Office Investment Manager
                                        (investing FO capital)
                                    </Text>
                                    <Text style={styles.investorTypeText}>
                                        - Institutional Investor - Investment
                                        Manager
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Accredited investor
                                    </Text>
                                    <Text style={styles.valueText}>Yes</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Investment sectors
                                    </Text>
                                    <View style={styles.wrap}>
                                        {[
                                            'Cloud Computing',
                                            'Bockchain / Crypto / Web3',
                                            'AudioTech',
                                            'Digital Health',
                                            'Enterprise',
                                        ].map((item, index) => {
                                            return (
                                                <View
                                                    style={styles.wrapItem}
                                                    key={index}>
                                                    <Text
                                                        style={
                                                            styles.wrapItemText
                                                        }>
                                                        {item}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        How many investments have you made so
                                        far?
                                    </Text>
                                    <Text style={styles.valueText}>25</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Portfolio companies
                                    </Text>
                                    <Text style={styles.valueText}>
                                        Amazon, Microsoft, Github, Bitbucket
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        What is your AUM $ value (Assets Under
                                        management in USD)?
                                    </Text>
                                    <Text style={styles.valueText}>$ 500K</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        How many deals do you plan to make in
                                        the next 12 months?
                                    </Text>
                                    <Text style={styles.valueText}>10-15</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Average investment size per company?
                                    </Text>
                                    <Text style={styles.valueText}>
                                        $100K-$500K
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Investment stages
                                    </Text>
                                    <View style={styles.wrap}>
                                        {[
                                            'Seed Extension',
                                            'Series B',
                                            'Series C',
                                            'Series H+',
                                            'Token Sale (SAFT)',
                                        ].map((item, index) => {
                                            return (
                                                <View
                                                    style={styles.wrapItem}
                                                    key={index}>
                                                    <Text
                                                        style={
                                                            styles.wrapItemText
                                                        }>
                                                        {item}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.captionText}>
                                        Geographies
                                    </Text>
                                    <View style={styles.wrap}>
                                        {[
                                            'North America',
                                            'Europe',
                                            'Israel',
                                        ].map((item, index) => {
                                            return (
                                                <View
                                                    style={styles.wrapItem}
                                                    key={index}>
                                                    <Text
                                                        style={
                                                            styles.wrapItemText
                                                        }>
                                                        {item}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
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
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: theme.spacing.xs,
    },
    wrapItem: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.grey1,
        marginLeft: theme.spacing.xs,
        marginTop: theme.spacing.xs,
        borderRadius: 20,
    },
    wrapItemText: {
        fontSize: 12,
        color: theme.colors.white,
    },
}));
