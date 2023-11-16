import {Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export const Spinner = ({visible}) => {
    const {theme} = useTheme();
    return (
        <View style={[styles.container, {display: visible ? 'flex' : 'none'}]}>
            <Progress.CircleSnail size={60} color={[theme.colors.primary, theme.colors.success, theme.colors.error]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099',
        width: WIDTH,
        height: HEIGHT,
        top: 0,
        left: 0,
        zIndex: 10000,
    },
});
