import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@rneui/themed';
import {Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Composer, GiftedChat} from 'react-native-gifted-chat';
import BotImg from '../assets/bot.png';
import {getChat} from '../redux/action/action';
import {useDispatch} from 'react-redux';

export default function ChatScreen({navigation, route}) {
    const {theme} = useTheme();
    const styles = useStyles();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const {docID} = route.params;

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: `AI chatbots for financial due diligence can automate tasks, improve accuracy, and reduce costs, helping accredited investors make better investment and acquisition decisions. \n\n Please ask what you want.`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Deelio',
                    avatar: BotImg,
                },
            },
        ]);
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        setIsTyping(true);
        getChat(dispatch, {
            docID,
            msg: [
                {
                    sender: 'User',
                    message: messages[0].text,
                },
            ],
        })
            .then(res => {
                const answerMessge = {
                    _id: res.created,
                    text: res.answer.message,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Deelio',
                        avatar: BotImg,
                    },
                };
                setIsTyping(false);
                setMessages(previousMessages => GiftedChat.append(previousMessages, [answerMessge]));
            })
            .catch(err => {
                const failMessge = {
                    _id: new Date().getTime().toString(),
                    text: 'Failed to send a message.',
                    createdAt: new Date(),
                    system: true,
                    user: {
                        _id: 1,
                        name: 'System',
                    },
                };
                setIsTyping(false);
                setMessages(previousMessages => GiftedChat.append(previousMessages, [failMessge]));
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    isTyping={isTyping}
                    user={{
                        _id: 1,
                    }}
                    renderComposer={props => <Composer textInputStyle={{color: theme.colors.grey0}} {...props} />}
                />
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
        paddingBottom: Platform.select({ios: 14, android: 0}),
        backgroundColor: theme.colors.greyOutline,
    },
}));
