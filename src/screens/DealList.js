import React, {useState} from 'react';
import {FlatList, Platform, TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text, useTheme} from '@rneui/themed';
import {STYLES} from '../global/styles';
import {DEALS} from '../constant/mock-data';
import Input from '../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export default function DealListScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const [search, setSearch] = useState('');

    const goDetail = data => {
        navigation.navigate('DealDetail', {deal: data});
    };

    const renderFooter = attrs => {
        if (attrs?.length > 3) {
            return (
                <>
                    {[0, 1, 2].map(i => (
                        <View key={i} style={styles.attributeTextContainer}>
                            <Text style={styles.attributeText}>{attrs[i]}</Text>
                        </View>
                    ))}
                    <View
                        style={[
                            styles.attributeTextContainer,
                            {backgroundColor: theme.colors.grey1},
                        ]}>
                        <Text style={styles.attributeText}>
                            +{attrs?.length - 3}
                        </Text>
                    </View>
                </>
            );
        } else {
            return (
                <>
                    {attrs?.map((attr, index) => (
                        <View key={index} style={styles.attributeTextContainer}>
                            <Text style={styles.attributeText}>{attr}</Text>
                        </View>
                    ))}
                </>
            );
        }
    };

    const DealItem = ({data}) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    goDetail(data);
                }}>
                <View style={styles.itemBoby}>
                    <View>
                        <Text style={styles.normalText}>
                            <Text style={styles.dealNameText}>{data.name}</Text>
                        </Text>
                        <Text style={styles.normalText}>
                            OWNER:{' '}
                            <Text style={styles.nameText}>
                                {data.ownerName}
                            </Text>
                        </Text>
                        <Text style={styles.normalText}>
                            PHONE:{' '}
                            <Text style={styles.nameText}>
                                {data.primaryContact}
                            </Text>
                        </Text>
                        <View style={styles.investmentItemContainer}>
                            <View style={styles.investmentTypeTextContainer}>
                                <Text style={styles.investmentTypeText}>
                                    {data.investmentType}
                                </Text>
                            </View>
                            <View style={styles.investmentSizeTextContainer}>
                                <Text style={styles.investmentSizeText}>
                                    {data.investmentSize}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        source={data.img}
                        style={{height: 120, width: 90, resizeMode: 'contain'}}
                    />
                </View>
                <View style={styles.itemFooter}>
                    {renderFooter(data.attribute)}
                </View>
            </TouchableOpacity>
        );
    };

    const DealHeader = ({date}) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{date}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text h4>Deals</Text>
                <View style={styles.searchContainer}>
                    <Input
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}
                        containerStyle={styles.searchInput}
                        leftIcon={
                            <Feather
                                name="search"
                                size={18}
                                color={theme.colors.grey3}
                            />
                        }
                        rightIcon={
                            search && (
                                <TouchableOpacity>
                                    <AntDesign
                                        name="close"
                                        size={18}
                                        color={theme.colors.grey1}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    />
                </View>
                <FlatList
                    data={DEALS}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        if (item.type === 'date') {
                            return <DealHeader key={index} date={item.date} />;
                        } else {
                            return <DealItem key={index} data={item.data} />;
                        }
                    }}
                    contentContainerStyle={[STYLES.wFull]}
                    keyExtractor={item => item.id}
                    ListFooterComponent={<View style={{height: 130}} />}
                />
            </View>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: Platform.select({ios: 50, android: 20}),
    },
    body: {
        display: 'flex',
        width: '100%',
    },
    header: {
        backgroundColor: theme.colors.searchBg,
        paddingVertical: 10,
        paddingHorizontal: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grey5,
    },
    headerText: {},
    item: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.greyOutline,
        paddingHorizontal: theme.spacing.md,
        display: 'flex',
    },
    itemBoby: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    investmentSizeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.success,
        marginTop: theme.spacing.xs,
        borderRadius: 30,
    },
    investmentSizeText: {
        color: theme.colors.white,
    },
    attributeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.grey4,
        borderRadius: 30,
        marginRight: theme.spacing.xs,
        minWidth: 40,
        alignItems: 'center',
    },
    attributeText: {
        color: theme.colors.white,
        fontSize: 11,
    },
    investmentTypeTextContainer: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.grey2,
        borderRadius: 30,
    },
    investmentTypeText: {
        color: theme.colors.white,
    },
    investmentItemContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: theme.spacing.md,
    },
    itemFooter: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing.sm,
    },
    normalText: {
        color: theme.colors.grey4,
        fontWeight: '300',
    },
    nameText: {},
    dealNameText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchContainer: {
        marginTop: theme.spacing.md,
    },
    searchInput: {
        marginBottom: 0,
    },
}));
