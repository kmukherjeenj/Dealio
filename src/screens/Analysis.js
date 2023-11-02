import React, {useState} from 'react';
import {Dimensions, Platform, ScrollView, View} from 'react-native';
import {makeStyles, Text, useTheme} from '@rneui/themed';
import {LineChart, PieChart} from 'react-native-chart-kit';

export default function AnalysisScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const [search, setSearch] = useState('');

    const goDetail = data => {
        navigation.navigate('DealDetail', {deal: data});
    };

    const chartConfig = {
        backgroundGradientFrom: theme.colors.primary,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: theme.colors.primary,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    const data1 = [
        {
            name: 'Signed',
            population: 21500000,
            color: theme.colors.success,
            legendFontColor: '#FFFFFF',
            legendFontSize: 12,
        },
        {
            name: 'Declined',
            population: 2800000,
            color: theme.colors.error,
            legendFontColor: '#FFFFFF',
            legendFontSize: 12,
        },
        {
            name: 'Pending',
            population: 5276120,
            color: theme.colors.warning,
            legendFontColor: '#FFFFFF',
            legendFontSize: 12,
        },
        {
            name: 'Others',
            population: 8538000,
            color: theme.colors.grey5,
            legendFontColor: '#FFFFFF',
            legendFontSize: 12,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text h4>Analysis</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.subTitleText}>Sessions by Month</Text>
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                    ],
                                },
                            ],
                        }}
                        width={
                            Dimensions.get('window').width -
                            theme.spacing.lg * 2
                        } // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: theme.spacing.lg,
                            borderRadius: theme.spacing.lg,
                        }}
                    />
                    <Text style={styles.subTitleText}>Traffic Sources</Text>
                    <PieChart
                        data={data1}
                        width={
                            Dimensions.get('window').width -
                            theme.spacing.lg * 2
                        }
                        height={220}
                        chartConfig={chartConfig}
                        accessor={'population'}
                        paddingLeft={'15'}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            backgroundColor: '#7775F6',
                            borderRadius: theme.spacing.lg,
                            marginTop: theme.spacing.lg,
                        }}
                    />
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
        paddingHorizontal: theme.spacing.lg,
        paddingTop: Platform.select({ios: 50, android: 20}),
    },
    body: {
        display: 'flex',
        width: '100%',
    },
    subTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.grey2,
        marginTop: theme.spacing.lg,
    },
}));
