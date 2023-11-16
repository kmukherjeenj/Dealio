import React, {useCallback, useEffect} from 'react';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text, AirbnbRating, useTheme} from '@rneui/themed';
import {STYLES} from '../global/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDeals} from '../redux/action/action';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {FirstUpperCase} from '../utils/uppercaseFirstLetter';
import SERVER from '../server/server';
import {Tabs} from 'react-native-collapsible-tab-view';
import {makeShort} from '../utils/makeShort';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;

const PAGE_HEIGHT = 450;
const PAGE_WIDTH = width;

export default function DealListScreen({navigation}) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const deals = useSelector(state => state.deals);
    const token = useSelector(state => state.token);
    const {theme} = useTheme();

    useEffect(() => {
        if (token) {
            SERVER.defaults.headers.common.Authorization = `Bearer ${token}`;
            getData();
        }
    }, [token, navigation]);

    const getData = () => {
        getDeals(dispatch)
            .then(res => {})
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err,
                });
            });
    };

    const goReload = () => {
        getData();
    };

    const pressAnim = useSharedValue(0);

    const animationStyle = useCallback(value => {
        'worklet';

        const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
        const translateX = interpolate(value, [-1, 0, 1], [-PAGE_WIDTH, 0, PAGE_WIDTH]);

        return {
            transform: [{translateX}],
            zIndex,
        };
    }, []);

    const renderHeader = () => {
        return (
            <Carousel
                autoPlay
                autoPlayInterval={5000}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                data={deals}
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_HEIGHT - 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                customAnimation={animationStyle}
                onScrollBegin={() => {
                    pressAnim.value = withTiming(1);
                }}
                onScrollEnd={() => {
                    pressAnim.value = withTiming(0);
                }}
                scrollAnimationDuration={500}
                onSnapToItem={index => {}}
                renderItem={({item, index}) => {
                    return <CustomItem key={`carousel-${index}`} index={index} navigation={navigation} item={item} pressAnim={pressAnim} />;
                }}
            />
        );
    };

    const renderItem = ({item, index}) => {
        const goDetail = () => {
            navigation.navigate('DealDetail', {deal: item});
        };

        return (
            <TouchableOpacity style={[styles.listContainer, {backgroundColor: index % 2 === 0 ? theme.colors.white : '#FAFAFA'}]} onPress={goDetail}>
                <View>
                    <View style={[STYLES.row]}>
                        <Ionicons name="home-outline" color={theme.colors.primary} size={14} />
                        <Text style={[styles.locationText, {color: theme.colors.primary}]}>{item.company.name?.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.listTitle}>{makeShort(FirstUpperCase(item.title), 25)}</Text>
                    <View style={styles.listRatingContainer}>
                        <AirbnbRating size={14} isDisabled showRating={false} readonly defaultRating={5} />
                        <Text style={{color: theme.colors.warning}}>5.0</Text>
                    </View>
                    <View>
                        <View style={[STYLES.row]}>
                            <Ionicons name="card-outline" color={theme.colors.warning} size={16} />
                            <Text style={[styles.locationText, {color: theme.colors.grey2}]}>
                                ${item.minMaxInvestmentAmount.min} - ${item.minMaxInvestmentAmount.max}
                            </Text>
                        </View>
                        <View style={[STYLES.row]}>
                            <Ionicons name="time-outline" color={theme.colors.error} size={16} />
                            <Text style={[styles.locationText, {color: theme.colors.grey2}]}>{item.dealDuration}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={{uri: item.mainImage}} style={styles.listImg} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Tabs.Container
            renderHeader={renderHeader}
            renderTabBar={() => (
                <View style={styles.listHeader}>
                    <View style={[STYLES.row, {alignItems: 'flex-end'}]}>
                        <Image source={require('../assets/favicon.png')} style={{width: 34, height: 34, resizeMode: 'cover'}} />
                        <Text style={[styles.subTitle, STYLES.ml8]}>FEATURED DEALS</Text>
                    </View>
                    <TouchableOpacity style={styles.reloadButton} onPress={goReload}>
                        <Ionicons name="reload" color={theme.colors.primary} size={24} />
                    </TouchableOpacity>
                </View>
            )}>
            <Tabs.Tab name="deals">
                <Tabs.FlatList
                    data={deals}
                    refreshing={false}
                    renderItem={renderItem}
                    keyExtractor={v => v.id}
                    onRefresh={() => {
                        getData();
                    }}
                />
            </Tabs.Tab>
        </Tabs.Container>
    );
}

const CustomItem = ({item, index, navigation, pressAnim}) => {
    const styles = useStyles();
    const {theme} = useTheme();

    const animStyle = useAnimatedStyle(() => {
        const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
        const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);

        return {
            transform: [{scale}],
            borderRadius,
        };
    }, []);

    const goDetail = () => {
        navigation.navigate('DealDetail', {deal: item});
    };

    return (
        <Animated.View style={[{flex: 1, overflow: 'hidden'}, animStyle]} key={item.id}>
            <FastImage source={{uri: item.mainImage}} resizeMode="cover" style={styles.itemImg} />
            <TouchableOpacity style={styles.detailButton} onPress={goDetail}>
                <MaterialIcons name="dashboard" size={20} color={theme.colors.white} />
                <Text style={styles.detailButtonText}>View Detail</Text>
            </TouchableOpacity>
            <Animated.View style={styles.ratingContainer}>
                <AirbnbRating size={22} isDisabled showRating={false} readonly defaultRating={5} />
                <Animated.Text style={styles.ratingText}>5.0</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.infoWrap}>
                <Animated.Image source={{uri: item.mainImage}} resizeMethod="scale" blurRadius={40} style={styles.infoContainer} />
                <Animated.View style={styles.infoView}>
                    <View style={[STYLES.row, STYLES.alignC, {justifyContent: 'space-between'}]}>
                        <Animated.Text style={styles.titleText}>{makeShort(FirstUpperCase(item.title), 20)}</Animated.Text>
                    </View>
                    <Animated.View style={styles.companyContainer}>
                        <Animated.View style={[STYLES.row]}>
                            <Ionicons name="home-outline" color={theme.colors.primary} size={14} />
                            <Animated.Text style={styles.locationText}>{item.company.name?.toUpperCase()}</Animated.Text>
                        </Animated.View>
                        <Animated.View style={[STYLES.row, {marginLeft: theme.spacing.lg}]}>
                            <Ionicons name="logo-whatsapp" color={theme.colors.primary} size={14} />
                            <Animated.Text style={styles.locationText}>{item.company.phone}</Animated.Text>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={styles.companyContainer}>
                        <Animated.View style={[STYLES.row]}>
                            <Ionicons name="location-outline" color={theme.colors.error} size={16} />
                            <Animated.Text style={styles.locationText}>{makeShort(item.company.location.address, 30)}</Animated.Text>
                        </Animated.View>
                        <Animated.View style={styles.returnContainer}>
                            <Animated.Text style={styles.locationText}>{item.dealStructure.ownershipPercentageOffered}% Return</Animated.Text>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={[styles.companyContainer, {marginTop: theme.spacing.md}]}>
                        <View style={{width: '50%'}}>
                            <Animated.View style={[STYLES.row]}>
                                <Ionicons name="card-outline" color={theme.colors.warning} size={16} />
                                <Animated.Text style={styles.locationText}>Investment Range</Animated.Text>
                            </Animated.View>
                            <Animated.View style={[STYLES.row]}>
                                <Animated.Text style={styles.valueText}>
                                    ${item.minMaxInvestmentAmount.min} - ${item.minMaxInvestmentAmount.max}
                                </Animated.Text>
                            </Animated.View>
                        </View>
                        <View style={{width: '50%', paddingLeft: theme.spacing.lg}}>
                            <Animated.View style={[STYLES.row]}>
                                <Ionicons name="time-outline" color={theme.colors.error} size={16} />
                                <Animated.Text style={styles.locationText}>Deal Duration</Animated.Text>
                            </Animated.View>
                            <Animated.View style={[STYLES.row]}>
                                <Animated.Text style={styles.valueText}>{item.dealDuration}</Animated.Text>
                            </Animated.View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingTop: Platform.select({ios: 56, android: 20}),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
        elevation: 11,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    infoWrap: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        width: '100%',
        marginBottom: 30,
    },
    infoContainer: {
        width: '100%',
        height: (PAGE_HEIGHT / 5) * 2,
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60,
        position: 'absolute',
    },
    infoView: {
        display: 'flex',
        width: '100%',
        height: (PAGE_HEIGHT / 5) * 2,
        backgroundColor: '#00000047',
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingHorizontal: theme.spacing.lg * 2,
        paddingVertical: theme.spacing.lg,
    },
    itemImg: {
        width: '100%',
        height: (PAGE_HEIGHT / 5) * 3 + 30,
        zIndex: 1,
    },
    companyContainer: {
        marginVertical: theme.spacing.xs,
        display: 'flex',
        flexDirection: 'row',
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
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.black,
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        height: Platform.select({ios: 90, android: 70}),
    },
    listContainer: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listImg: {
        width: 80,
        height: 80,
        borderRadius: theme.spacing.lg,
        resizeMode: 'cover',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.grey1,
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.sm,
    },
    listAmount: {
        fontSize: 12,
    },
    detailButton: {
        position: 'absolute',
        zIndex: 10,
        top: Platform.select({ios: 90, android: 50}),
        right: 20,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    detailButtonText: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: theme.spacing.xs,
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'absolute',
        zIndex: 10,
        bottom: 220,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 20,
        color: theme.colors.primary,
        marginLeft: theme.spacing.xs,
    },
    listRatingContainer: {
        display: 'flex',
        marginTop: -8,
        flexDirection: 'row',
        marginVertical: theme.spacing.xs,
        alignItems: 'center',
    },
    reloadButton: {
        marginRight: theme.spacing.md,
    },
}));
