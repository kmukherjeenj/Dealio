import React, {useState} from 'react';
import {Dimensions, ImageBackground, Platform, ScrollView, TouchableOpacity, View, StyleSheet, Pressable} from 'react-native';
import {makeStyles, Text, useTheme, AirbnbRating} from '@rneui/themed';
import {STYLES} from '../global/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FirstUpperCase} from '../utils/uppercaseFirstLetter';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MapView, {Marker} from 'react-native-maps';
import {BarChart, LineChart, ProgressChart} from 'react-native-chart-kit';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';

import ROOM1 from '../assets/room0.jpg';
import ROOM2 from '../assets/room1.jpg';
import ROOM3 from '../assets/room2.jpg';
import ROOM4 from '../assets/room3.jpg';
import ROOM5 from '../assets/room4.jpg';
import ROOM6 from '../assets/room5.jpg';
import Animated from 'react-native-reanimated';
import {makeShort} from '../utils/makeShort';

const ROOM_IMG = [ROOM1, ROOM2, ROOM3, ROOM4, ROOM5, ROOM6];

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function DealDetailScreen({navigation, route}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const [fullImageVisible, setFullImageVisible] = useState(false);
    const [fullImageIndex, setFullImageIndex] = useState(0);
    const {deal} = route.params;

    const goBack = () => {
        navigation.goBack();
    };

    const moveOut = {
        from: {
            opacity: 1,
            translateY: 0,
        },
        to: {
            opacity: 0,
            translateY: 10,
        },
    };

    const data = {
        data: [0.4, 0.6, 0.8],
    };

    const chartConfig = {
        backgroundGradientFrom: theme.colors.white,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: theme.colors.white,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(31, 200, 190, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [35, 43, 85, 23, 98, 89],
            },
        ],
    };

    const goSign = () => {
        navigation.navigate('Signed');
    };

    const goChat = () => {
        navigation.navigate('ChatList', {deal});
    };

    const Item = ({imageSource, onPress, entering}) => {
        return (
            <Pressable onPress={onPress}>
                <Animated.View entering={entering}>
                    <Animated.Image
                        source={imageSource}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: theme.spacing.md,
                        }}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Pressable>
        );
    };

    return (
        <PagerView style={styles.container} initialPage={0} orientation="vertical">
            <View key="1">
                <View style={styles.firstPage}>
                    <ImageBackground source={{uri: deal.mainImage}} resizeMethod="scale" blurRadius={40} style={styles.imgBackground}>
                        <View style={{backgroundColor: '#000000A0', height: '100%'}}>
                            <FastImage source={{uri: deal.mainImage}} style={styles.mainImage} />
                            <View style={styles.firstPageBody}>
                                <Text style={styles.titleText}>{FirstUpperCase(deal.title)}</Text>
                                <View style={styles.ratingContainer}>
                                    <AirbnbRating size={22} isDisabled showRating={false} readonly defaultRating={5} />
                                    <Text style={styles.ratingText}>5.0</Text>
                                </View>
                                <View style={styles.companyContainer}>
                                    <View style={[STYLES.row]}>
                                        <Ionicons name="home-outline" color={theme.colors.primary} size={14} />
                                        <Text style={styles.locationText}>{deal.company.name?.toUpperCase()}</Text>
                                    </View>
                                    <View style={[STYLES.row, {marginLeft: theme.spacing.lg}]}>
                                        <Ionicons name="logo-whatsapp" color={theme.colors.primary} size={14} />
                                        <Text style={styles.locationText}>{deal.company.phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.companyContainer}>
                                    <View style={[STYLES.row]}>
                                        <Ionicons name="location-outline" color={theme.colors.error} size={16} />
                                        <Text style={styles.locationText}>{makeShort(deal.company.location.address, 36)}</Text>
                                    </View>
                                    <View style={styles.returnContainer}>
                                        <Text style={styles.locationText}>{deal.dealStructure.ownershipPercentageOffered}% Return</Text>
                                    </View>
                                </View>
                                <View style={[styles.companyContainer, {marginTop: theme.spacing.md}]}>
                                    <View style={{width: '50%'}}>
                                        <View style={[STYLES.row]}>
                                            <Ionicons name="card-outline" color={theme.colors.warning} size={16} />
                                            <Text style={styles.locationText}>Investment Range</Text>
                                        </View>
                                        <View style={[STYLES.row]}>
                                            <Text style={styles.valueText}>
                                                ${deal.minMaxInvestmentAmount.min} - ${deal.minMaxInvestmentAmount.max}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{width: '50%', paddingLeft: theme.spacing.lg}}>
                                        <View style={[STYLES.row]}>
                                            <Ionicons name="time-outline" color={theme.colors.error} size={16} />
                                            <Text style={styles.locationText}>Deal Duration</Text>
                                        </View>
                                        <View style={[STYLES.row]}>
                                            <Text style={styles.valueText}>{deal.dealDuration}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.sectorContainer}>
                                    {deal.dealStructure.type?.map((att, index) => (
                                        <View key={index} style={styles.attributeTextContainer}>
                                            <Text style={styles.attributeText}>{att}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.dealButton} onPress={goSign}>
                        <FontAwesome5 name="hands-helping" size={20} color={theme.colors.white} />
                        <Text style={styles.dealButtonText}>Sign a Deal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chatButton} onPress={goChat}>
                        <FontAwesome5 name="robot" size={20} color={theme.colors.white} />
                        <Text style={styles.dealButtonText}>Chat with AI Bot</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', bottom: 24, alignItems: 'center', width: '100%'}}>
                    <AnimatedIcon
                        name="chevrons-up"
                        size={24}
                        color={theme.colors.white}
                        animation={moveOut}
                        iterationCount={'infinite'}
                        direction="alternate"
                    />
                </View>
            </View>
            <View key="2">
                <View style={styles.secondPage}>
                    {deal && deal.pastProjects && (
                        <ImageView
                            images={deal.pastProjects.map(item => ({uri: item}))}
                            imageIndex={fullImageIndex}
                            visible={fullImageVisible}
                            onRequestClose={() => {
                                setFullImageVisible(false);
                            }}
                        />
                    )}

                    <View style={styles.secondPageHeader}>
                        <TouchableOpacity style={styles.secondPageHeaderButton} onPress={goBack}>
                            <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goSign}>
                            <FontAwesome5 name="hands-helping" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="dashboard" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>The Deelio</Text>
                            </View>
                            <View style={styles.listBody}>
                                <Text style={styles.listText}>{deal.dealStructure.terms}</Text>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="location-pin" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>PROJECT LOCATION</Text>
                            </View>
                            <View style={styles.listBody}>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]}>{'Greenville, North Carolina'}</Text>
                                </View>
                                <View style={styles.mapView}>
                                    <MapView
                                        mapType="standard"
                                        style={styles.map}
                                        region={{
                                            latitude: 35.6127,
                                            longitude: -77.3664,
                                            latitudeDelta: 0.0115,
                                            longitudeDelta: 0.01121,
                                        }}>
                                        <Marker
                                            coordinate={{
                                                latitude: 35.6127,
                                                longitude: -77.3664,
                                            }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="video-collection" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>ABOUT US</Text>
                            </View>
                            <View style={styles.listBody}>
                                <YoutubePlayer
                                    height={((WIDTH - theme.spacing.lg * 2) * 9) / 16}
                                    play={false}
                                    videoId={'8th1jMu2n7s'}
                                    onChangeState={() => {}}
                                />
                            </View>
                        </View> */}
                        {deal && deal.pastProjects && (
                            <View style={styles.list}>
                                <View style={styles.listHeader}>
                                    <Ionicons name="images" size={18} color={theme.colors.primary} />
                                    <Text style={styles.subTitle}>PAST PROJECTS</Text>
                                </View>
                                <View style={styles.listBody}>
                                    <Carousel
                                        loop={false}
                                        autoPlay={false}
                                        style={{width: WIDTH - theme.spacing.lg * 2, height: 240}}
                                        width={WIDTH - theme.spacing.lg * 4}
                                        data={deal.pastProjects}
                                        mode="horizontal-stack"
                                        modeConfig={{
                                            snapDirection: 'left',
                                            stackInterval: 14,
                                            opacityInterval: 0.14,
                                        }}
                                        onSnapToItem={index => {
                                            setFullImageIndex(index);
                                        }}
                                        renderItem={({item, index}) => {
                                            return (
                                                <Item
                                                    key={index}
                                                    imageSource={{uri: item}}
                                                    onPress={() => {
                                                        setFullImageIndex(index);
                                                        setFullImageVisible(true);
                                                    }}
                                                />
                                            );
                                        }}
                                        scrollAnimationDuration={600}
                                    />
                                </View>
                            </View>
                        )}
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="policy" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>TERMS AND CONDITIONS</Text>
                            </View>
                            <View style={styles.listBody}>
                                <Text style={styles.listText}>{deal.legalAndCompliance.termsAndConditions}</Text>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="insert-chart" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>PLAN</Text>
                            </View>
                            <View style={styles.listBody}>
                                <Text style={styles.listText}>{deal.businessPlan}</Text>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="home-work" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>COMPANY</Text>
                            </View>
                            <View style={styles.listBody}>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <MaterialIcons name="bookmark" size={18} color={theme.colors.primary} />
                                    <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]}>{deal.company.name}</Text>
                                </View>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <MaterialIcons name="local-phone" size={18} color={theme.colors.primary} />
                                    <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]}>{deal.company.phone}</Text>
                                </View>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <MaterialIcons name="mail" size={18} color={theme.colors.primary} />
                                    <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]}>{deal.company.email}</Text>
                                </View>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <MaterialIcons name="developer-board" size={18} color={theme.colors.primary} />
                                    {deal.company.industry.map((item, index) => (
                                        <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]} key={index}>
                                            {item},
                                        </Text>
                                    ))}
                                </View>
                                <View style={[STYLES.row, STYLES.alignC, STYLES.mb8]}>
                                    <MaterialIcons name="location-city" size={18} color={theme.colors.primary} />
                                    <Text style={[styles.listText, {marginLeft: theme.spacing.xs}]}>{deal.company.location.address}</Text>
                                </View>
                                <View style={styles.mapView}>
                                    <MapView
                                        mapType="standard"
                                        style={styles.map}
                                        region={{
                                            latitude: deal.company.location.coordinate.lat,
                                            longitude: deal.company.location.coordinate.lng,
                                            latitudeDelta: 0.0115,
                                            longitudeDelta: 0.01121,
                                        }}>
                                        <Marker
                                            coordinate={{
                                                latitude: deal.company.location.coordinate.lat,
                                                longitude: deal.company.location.coordinate.lng,
                                            }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <MaterialIcons name="analytics" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>MARKET</Text>
                            </View>
                            <View style={[styles.listBody, {paddingHorizontal: 0}]}>
                                <Text style={styles.chartText}>2022 Company Status</Text>
                                <ProgressChart
                                    data={data}
                                    width={WIDTH}
                                    height={220}
                                    strokeWidth={16}
                                    radius={28}
                                    chartConfig={chartConfig}
                                    hideLegend={false}
                                />
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={[styles.listBody, {paddingHorizontal: 0}]}>
                                <Text style={[styles.chartText, STYLES.mt20, STYLES.mb12]}>2022 Average Monthly Occuppancy</Text>
                                <BarChart data={data1} width={WIDTH} height={260} yAxisLabel="%" chartConfig={chartConfig} fromZero />
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={[styles.listBody, {paddingHorizontal: 0}]}>
                                <Text style={[styles.chartText, STYLES.mt20, STYLES.mb12]}>2022 Average Monthly Daily Rate</Text>
                                <LineChart data={data1} width={WIDTH} height={260} yAxisLabel="%" chartConfig={chartConfig} fromZero bezier />
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.listHeader}>
                                <Ionicons name="documents" size={20} color={theme.colors.primary} />
                                <Text style={styles.subTitle}>DOCUMENTS</Text>
                            </View>
                            <View style={styles.listBody}>
                                {deal.legalAndCompliance.attachments.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('PDFViewer', {uri: item.url, name: item.name});
                                        }}
                                        style={styles.attachment}
                                        key={index}>
                                        <Text style={styles.attatchText}>{item.name}</Text>
                                        <MaterialIcons name="chevron-right" size={28} color={theme.colors.grey2} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <View style={{height: 150}} />
                    </ScrollView>
                </View>
            </View>
        </PagerView>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
    },
    firstPage: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainImage: {
        width: '100%',
        height: HEIGHT * 0.4,
        resizeMode: 'cover',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    imgBackground: {
        width: '100%',
        height: HEIGHT,
    },
    header: {
        display: 'flex',
        height: HEIGHT * 0.8,
        backgroundColor: 'gray',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: theme.spacing.lg,
    },
    firstPageBody: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
    },
    companyContainer: {
        marginVertical: theme.spacing.xs,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: theme.colors.white,
        fontSize: 12,
        marginLeft: theme.spacing.xs,
    },
    returnContainer: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xs,
        borderRadius: theme.spacing.xs,
        marginLeft: theme.spacing.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectorContainer: {
        borderTopColor: theme.colors.white,
        borderTopWidth: 1,
        marginTop: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    attributeTextContainer: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        borderRadius: theme.spacing.lg,
    },
    attributeText: {
        color: theme.colors.primary,
        fontSize: 12,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        bottom: 54,
    },
    chatButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '90%',
        height: 44,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 30,
        marginTop: theme.spacing.sm,
    },
    dealButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '90%',
        height: 44,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
    },
    dealButtonText: {
        fontSize: 18,
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: theme.spacing.sm,
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#00000058',
        left: '5%',
        position: 'absolute',
        top: Platform.select({ios: 60, android: 30}),
    },
    list: {
        backgroundColor: theme.colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.13,
        shadowRadius: 4,
        elevation: 4,
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
    secondPage: {
        width: '100%',
    },
    secondPageHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    secondPageHeaderButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#00000058',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.grey1,
        marginLeft: theme.spacing.xs,
    },
    listBody: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },
    listText: {
        fontSize: 14,
        color: theme.colors.grey1,
        lineHeight: 18,
    },
    mapView: {
        height: 200,
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 30,
        marginTop: theme.spacing.md,
    },
    map: {
        flex: 1,
        borderRadius: 30,
        ...StyleSheet.absoluteFillObject,
    },
    chartText: {
        textAlign: 'center',
        fontSize: 16,
        color: theme.colors.grey3,
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
    ratingContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    ratingText: {
        fontSize: 20,
        color: theme.colors.primary,
        marginLeft: theme.spacing.xs,
    },
}));
