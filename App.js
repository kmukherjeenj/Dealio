import React from 'react';
import {createTheme, ThemeProvider} from '@rneui/themed';
import Navigator from './src/navigator/navigator';

const theme = createTheme({
    lightColors: {
        primary: '#1FC8BE',
        secondary: '#608AF3',
        background: '#FFFFFF',
        white: '#FFFFFF',
        black: '#151718',
        grey0: '#262739',
        grey1: '#4E4F60',
        grey2: '#6B6C7B',
        grey3: '#7F7F8D',
        grey4: '#9596A4',
        grey5: '#BCC1D0',
        greyOutline: '#DDE2ED',
        searchBg: '#DDE2ED',
        success: '#32C19F',
        warning: '#F0BE5D',
        error: '#FF6060',
        disabled: '#F9FAFD',
        divider: '#DDE2ED',
    },
    darkColors: {
        primary: '#1FC8BE',
        secondary: '#608AF3',
        background: '#151718',
        white: '#FFFFFF',
        black: '#FFFFFF',
        grey0: '#131313',
        grey1: '#171717',
        grey2: '#1C1C1E',
        grey3: '#3D3C41',
        grey4: '#7F7F7F',
        grey5: '#999999',
        greyOutline: '#DDE2ED',
        searchBg: '#3D3C41',
        success: '#32C19F',
        warning: '#F0BE5D',
        error: '#FF6060',
        disabled: '#7F7F7F',
        divider: '#1C1C1E',
    },
    components: {
        Button: (props, theme) => ({
            titleStyle: {
                fontSize: 16,
            },
            containerStyle: {
                borderRadius: 12,
            },
        }),
        Text: {
            h4Style: {
                fontWeight: 'bold',
            },
        },
        Input: {
            inputContainerStyle: {
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: 12,
            },
            inputStyle: {
                borderWidth: 0,
                fontSize: 14,
            },
            containerStyle: {
                paddingHorizontal: 0,
            },
        },
    },
    mode: 'light', // or 'dark'
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Navigator />
        </ThemeProvider>
    );
}
