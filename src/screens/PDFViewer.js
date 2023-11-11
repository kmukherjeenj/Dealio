import React from 'react';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';

export default function PDFViewer({navigation, route}) {
    const {uri, name} = route.params;
    const {theme} = useTheme();
    const styles = useStyles();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
                </TouchableOpacity>
                <Text h4 style={{marginLeft: theme.spacing.sm}}>
                    {name}
                </Text>
            </View>
            <View style={styles.body}>
                <Pdf
                    source={{uri: uri, cache: true}}
                    trustAllCerts={false}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={error => {
                        console.log(error);
                    }}
                    onPressLink={uri => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
}));
