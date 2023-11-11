import React, {useEffect, useRef, useState} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {makeStyles, Text, Button, useTheme} from '@rneui/themed';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import {STYLES} from '../global/styles';
import {INVESTOR_TYPE} from '../constant/mock-data';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FieldArray} from 'formik';
import {register} from '../redux/action/action';
import Toast from 'react-native-toast-message';

const options = {
    componentRestrictions: {country: 'us'},
    fields: ['address_components', 'geometry', 'icon', 'name', 'formatted_address'],
    types: ['address'],
};

export default function EditAccountScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        if (address) {
            setError(false);
        } else {
            setError(true);
        }
    }, [address]);

    const schema = yup.object().shape({
        email: yup.string(),
        firstName: yup
            .string()
            .min(2, ({min}) => `First Name must be at least ${min} characters`)
            .required('First Name is required'),
        lastName: yup
            .string()
            .min(2, ({min}) => `Last Name must be at least ${min} characters`)
            .required('Last Name is required'),
        phone: yup.string().required('Whatsapp/Mobile is required'),
        companyName: yup.string().required('Company Name is required'),
        investorType: yup.array().min(1, 'At least one investor type is required').required('Investor Types is required'),
    });

    const onClose = () => {
        navigation.goBack();
    };

    const goRegister = values => {
        if (error) {
            return;
        }
        register(dispatch, values)
            .then(res => {
                navigation.navigate('HomeNav');
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err,
                });
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        email: email,
                        firstName: '',
                        lastName: '',
                        phone: '',
                        companyName: '',
                        investorType: [],
                    }}
                    onSubmit={goRegister}>
                    {({handleChange, handleSubmit, values, errors, isValid}) => (
                        <>
                            <View style={[STYLES.row, STYLES.sb, STYLES.wFull]}>
                                <Button title="Back" type="clear" titleStyle={{color: theme.colors.error}} onPress={onClose} />
                                <Button title="Submit" type="clear" onPress={handleSubmit} />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                                <Text style={STYLES.mv12}>
                                    Account details are used for approving investors to events and effective matchmaking with co-investors, deals, requests and
                                    offers.
                                </Text>
                                <View style={STYLES.mt12}>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Email</Text>
                                    </View>
                                    <Input placeholder="Enter your email" value={email} />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>First name</Text>
                                    </View>
                                    <Input
                                        placeholder="Enter your first name"
                                        value={values.firstName}
                                        onChangeText={handleChange('firstName')}
                                        errorMessage={errors.firstName}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Last name</Text>
                                    </View>
                                    <Input
                                        placeholder="Enter your last name"
                                        value={values.lastName}
                                        onChangeText={handleChange('lastName')}
                                        errorMessage={errors.lastName}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>WhatsApp / Mobile</Text>
                                    </View>
                                    <Input
                                        placeholder="Phone number"
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        errorMessage={errors.phone}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Company name</Text>
                                    </View>
                                    <Input
                                        placeholder="Company name"
                                        value={values.companyName}
                                        onChangeText={handleChange('companyName')}
                                        errorMessage={errors.companyName}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Address</Text>
                                    </View>
                                    <GooglePlacesAutocomplete
                                        ref={ref}
                                        placeholder="Search your address"
                                        onPress={(data, details = null) => {
                                            setAddress(data.description);
                                        }}
                                        listViewDisplayed={false}
                                        query={{
                                            key: 'AIzaSyAFF1M2AeYt8ZL5I72nwy6B1nEVS8mSxmU',
                                            language: 'en',
                                            types: 'address',
                                            components: 'country:us',
                                        }}
                                        textInputProps={{
                                            placeholderTextColor: theme.colors.grey3,
                                            onFocus: () => setSearchFocused(true),
                                            onBlur: () => setSearchFocused(false),
                                        }}
                                        styles={{
                                            textInput: {
                                                borderWidth: 1,
                                                borderColor: searchFocused ? theme.colors.primary : theme.colors.grey4,
                                                borderRadius: theme.spacing.md,
                                                paddingHorizontal: theme.spacing.lg,
                                                height: 50,
                                                marginBottom: theme.spacing.lg,
                                                color: theme.colors.grey0,
                                            },
                                            description: {
                                                color: theme.colors.grey3,
                                            },
                                            listView: {
                                                marginTop: -16,
                                            },
                                            row: {
                                                backgroundColor: '#F0F0F0',
                                            },
                                        }}
                                    />
                                    {error && <Text style={styles.errorText}>Address is required.</Text>}
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Investor type</Text>
                                    </View>
                                    {errors.investorType && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.investorType}
                                        </Text>
                                    )}
                                    <FieldArray name="investorType">
                                        {({remove, push}) => {
                                            return (
                                                <>
                                                    {INVESTOR_TYPE.map((type, index) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={[STYLES.row, STYLES.mb12]}
                                                                key={index}
                                                                onPress={() => {
                                                                    if (values.investorType?.includes(type.key)) {
                                                                        remove(values.investorType?.indexOf(type.key));
                                                                    } else {
                                                                        push(type.key);
                                                                    }
                                                                }}>
                                                                <Checkbox
                                                                    color={values.investorType?.includes(type.key) ? theme.colors.primary : theme.colors.grey4}
                                                                    value={values.investorType?.includes(type.key)}
                                                                />
                                                                <Text style={[STYLES.ml12, styles.checkboxText]}>{type.value}</Text>
                                                            </TouchableOpacity>
                                                        );
                                                    })}
                                                </>
                                            );
                                        }}
                                    </FieldArray>
                                </View>
                                <View style={{height: 150}} />
                            </ScrollView>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingTop: Platform.select({ios: 50, android: 20}),
    },
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    fieldText: {
        fontWeight: 'bold',
        maxWidth: 270,
    },
    requiredText: {
        color: theme.colors.grey4,
        fontSize: 12,
    },
    checkboxText: {
        maxWidth: '90%',
        fontWeight: '300',
    },
    errorText: {
        fontSize: 12,
        color: theme.colors.error,
        marginTop: -6,
    },
}));
