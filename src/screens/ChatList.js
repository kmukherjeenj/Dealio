import React, {useCallback, useEffect, useState} from 'react';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import {Dimensions, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat} from 'react-native-gifted-chat';
import BotImg from '../assets/bot.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {uploadDocument} from '../redux/action/action';
import {useDispatch} from 'react-redux';

export default function ChatListScreen({navigation, route}) {
    const {theme} = useTheme();
    const styles = useStyles();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const {deal} = route.params;

    const goBack = () => {
        navigation.goBack();
    };

    const goChat = item => {
        navigation.navigate('Chat', {docID: item.docID});
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.body}>
                <View style={styles.list}>
                    <View style={styles.listHeader}>
                        <Ionicons name="documents" size={20} color={theme.colors.primary} />
                        <Text style={styles.subTitle}>Choose a document</Text>
                    </View>
                    <View style={styles.listBody}>
                        {deal.legalAndCompliance.attachments.map((item, index) => (
                            <TouchableOpacity onPress={() => goChat(item)} style={styles.attachment} key={index}>
                                <Text style={styles.attatchText}>{item.name}</Text>
                                <MaterialIcons name="chevron-right" size={28} color={theme.colors.grey2} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
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
        paddingBottom: Platform.select({ios: 14, android: 0}),
    },
    list: {
        backgroundColor: theme.colors.white,
        shadowColor: '#000',
        marginTop: theme.spacing.md,
        borderRadius: theme.spacing.xs,
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
    },
    listBody: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },
    attatchText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.grey2,
    },
    attachment: {
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.greyOutline,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.grey1,
        marginLeft: theme.spacing.xs,
    },
}));
