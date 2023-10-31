import React, {useState} from 'react';
import {Linking, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {makeStyles, Text, useTheme, Image, Button} from '@rneui/themed';
import {STYLES} from '../global/styles';
import {Ionicons, FontAwesome5, Feather} from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';

export default function DealDetailScreen({navigation, route}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const {deal} = route.params;
    const [fullImg, setFullImg] = useState(false);

    const goLink = (url) => {
        Linking.openURL(url);
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons
                            name="arrow-back"
                            size={28}
                            color={theme.colors.grey1}
                        />
                    </TouchableOpacity>
                    <Text
                        h4
                        style={styles.headerText}
                    >
                        {deal.name}
                    </Text>
                    <TouchableOpacity>
                        <FontAwesome5
                            name="hands-helping"
                            size={28}
                            color={theme.colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imgContainer}>
                        <ImageView
                            images={[deal.img]}
                            imageIndex={0}
                            visible={fullImg}
                            onRequestClose={() => setFullImg(false)}
                        />
                        <Image
                            source={deal.img}
                            style={styles.img}
                            onPress={() => {
                                setFullImg(true);
                            }}
                        />
                    </View>
                    <View style={styles.dealDetailContainer}>
                        <View style={styles.dealInformation}>
                            <Text style={styles.dealNameText}>{deal.name}</Text>
                            <Text>{deal.summary}</Text>
                            <View style={styles.investmentItemContainer}>
                                <View style={styles.investmentTypeTextContainer}>
                                    <Text style={styles.investmentTypeText}>{deal.investmentType}</Text>
                                </View>
                                <View style={styles.investmentSizeTextContainer}>
                                    <Text style={styles.investmentSizeText}>{deal.investmentSize}</Text>
                                </View>
                            </View>
                            <View style={styles.itemFooter}>
                                {deal.attribute?.map((att, index) => (
                                    <View
                                        key={index}
                                        style={styles.attributeTextContainer}
                                    >
                                        <Text style={styles.attributeText}>{att}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={STYLES.mt12}>
                                <TouchableOpacity
                                    style={styles.attachment}
                                    onPress={() => {
                                        goLink(deal.attachments.executiveSummery);
                                    }}
                                >
                                    <Feather
                                        name="link"
                                        size={20}
                                        color={theme.colors.grey3}
                                    />
                                    <Text style={styles.attachmentText}>SUMMARY</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.attachment}
                                    onPress={() => {
                                        goLink(deal.attachments.projection);
                                    }}
                                >
                                    <Feather
                                        name="link"
                                        size={20}
                                        color={theme.colors.grey3}
                                    />
                                    <Text style={styles.attachmentText}>PROJECTION</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.attachment}
                                    onPress={() => {
                                        goLink(deal.attachments.misc);
                                    }}
                                >
                                    <Feather
                                        name="link"
                                        size={20}
                                        color={theme.colors.grey3}
                                    />
                                    <Text style={styles.attachmentText}>MISC</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.ownerInformation}>
                            <View style={{overflow: 'hidden'}}>
                                <View style={styles.ownerHeader}>
                                    <Text style={styles.ownerHeaderText}>Owner Information</Text>
                                </View>
                            </View>
                            <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                <Feather
                                    name="user"
                                    size={22}
                                    color={theme.colors.success}
                                />
                                <Text style={styles.ownerText}>{deal.ownerName}</Text>
                            </View>
                            <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                <Feather
                                    name="phone"
                                    size={22}
                                    color={theme.colors.success}
                                />
                                <Text style={styles.ownerText}>{deal.primaryContact}</Text>
                            </View>
                            <View style={[STYLES.row, STYLES.alignC]}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color={theme.colors.success}
                                />
                                <Text style={styles.ownerText}>{deal.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 200}} />
                </ScrollView>
                <Button
                    title={'Sign'}
                    containerStyle={styles.signButton}
                />
            </View>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    body: {
        display: 'flex',
        width: '100%',
    },
    imgContainer: {
        marginTop: 30,
        backgroundColor: theme.colors.grey1,
        borderRadius: theme.spacing.sm,
    },
    img: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: 60,
        paddingBottom: theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 11,
        backgroundColor: theme.colors.white,
    },
    headerText: {
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: theme.spacing.lg,
    },
    dealDetailContainer: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    dealInformation: {
        width: '100%',
    },
    ownerInformation: {
        borderWidth: 1,
        borderColor: theme.colors.greyOutline,
        borderRadius: theme.spacing.lg,
        padding: theme.spacing.md,
        marginTop: theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        backgroundColor: theme.colors.white,
        width: '96%',
    },
    ownerText: {
        fontSize: 16,
        marginLeft: theme.spacing.sm,
    },
    dealNameText: {
        fontSize: 20,
        marginBottom: theme.spacing.xs,
    },
    ownerHeader: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grey5,
        borderStyle: Platform.select({android: 'dashed', ios: 'solid'}),
        marginBottom: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    ownerHeaderText: {
        fontSize: 16,
        color: theme.colors.grey0,
        textAlign: 'center',
    },
    investmentSizeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.success,
        marginTop: theme.spacing.xs,
    },
    investmentSizeText: {
        color: theme.colors.white,
    },
    investmentTypeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.grey2,
    },
    investmentTypeText: {
        color: theme.colors.white,
    },
    investmentItemContainer: {
        display: 'flex',
        marginTop: theme.spacing.lg,
    },
    itemFooter: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing.sm,
        flexWrap: 'wrap',
    },
    attributeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.grey4,
        borderRadius: 30,
        marginRight: theme.spacing.xs,
        marginVertical: 2,
    },
    attributeText: {
        color: theme.colors.white,
    },
    attachment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.xs,
    },
    attachmentText: {
        marginLeft: theme.spacing.sm,
        marginTop: theme.spacing.xs,
        textDecorationLine: 'underline',
        color: theme.colors.grey1,
    },
    signButton: {
        position: 'absolute',
        bottom: 136,
        width: '90%',
        alignSelf: 'center',
    },
}));
