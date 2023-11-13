import React, {useCallback, useEffect, useState} from 'react';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat} from 'react-native-gifted-chat';
import BotImg from '../assets/bot.png';

export default function ChatScreen({navigation}) {
    const {theme} = useTheme();
    const styles = useStyles();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: `AI Chatbots for Financial Due Diligence

    Financial due diligence is a critical step in any investment or acquisition process. It involves the careful examination of a company's financial statements and other documents to assess its financial health and potential risks. This can be a time-consuming and complex process, especially for large companies with complex financial structures.

    AI chatbots can help to streamline and improve the financial due diligence process by automating tasks such as:

    • Data extraction: Chatbots can extract relevant financial data from financial statements and other documents, such as balance sheets, income statements, and cash flow statements. This data can then be fed into a financial due diligence platform for analysis.
    • Risk assessment: Chatbots can be trained to identify and assess potential financial risks, such as high debt levels, declining sales, or regulatory compliance issues. This can help to save time and ensure that all relevant risks are considered.
    • Reporting: Chatbots can generate reports that summarize the findings of the financial due diligence process. This can help to communicate the results to stakeholders in a clear and concise way.

    In addition to these benefits, AI chatbots can also help to improve the accuracy and efficiency of the financial due diligence process by:

    • Reducing human error: Chatbots are less prone to human error than traditional methods of financial due diligence, such as manual data extraction and analysis.
    • Improving scalability: Chatbots can be scaled to meet the needs of any company, regardless of size or complexity.
    • Reducing costs: Chatbots can help to reduce the costs associated with financial due diligence by automating tasks that would otherwise be performed by human analysts.

    Overall, AI chatbots offer a number of benefits for financial due diligence. They can help to streamline the process, improve accuracy and efficiency, and reduce costs.

    Here are some specific examples of how AI chatbots can be used for financial due diligence:

    • Identifying financial anomalies: Chatbots can be trained to identify anomalies in financial data, such as unusual fluctuations in revenue or expenses. This can help to identify potential fraud or other financial irregularities.
    • Assessing creditworthiness: Chatbots can be used to assess the creditworthiness of borrowers and lenders. This can help to reduce the risk of bad loans and improve the profitability of lending operations.
    • Complying with regulations: Chatbots can be used to help companies comply with financial regulations, such as anti-money laundering and know your customer requirements. This can help to reduce the risk of regulatory fines and penalties.

    AI chatbots are still in their early stages of development, but they have the potential to revolutionize the way that financial due diligence is performed. By automating tasks and improving accuracy and efficiency, AI chatbots can help to reduce the costs and risks associated with financial due diligence. This can make it more accessible to a wider range of companies and investors.`,
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
                    user={{
                        _id: 1,
                    }}
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
