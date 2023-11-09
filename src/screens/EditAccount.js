import React from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {makeStyles, Text, Button, useTheme} from '@rneui/themed';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import {STYLES} from '../global/styles';
import Selector from '../components/Selector';
import {DEAL_SIZE, GEOGRAPHIES, INVESTMENT_SECTORS, INVESTMENT_SIZE, INVESTMENT_STAGES, INVESTOR_TYPE} from '../constant/mock-data';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FieldArray} from 'formik';
import {register} from '../redux/action/action';
import Toast from 'react-native-toast-message';

export default function EditAccountScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);

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
        telegram: yup.string().required('Telegram is required'),
        linkedin: yup.string().required('Linkedin is required'),
        companyName: yup.string().required('Company Name is required'),
        companyWebsite: yup.string(),
        jobTitle: yup.string(),
        shortBio: yup.string(),
        cityOfResidency: yup.string().required('City of Residency is required'),
        countryOfResidency: yup.string().required('Country of Residency is required'),
        visitedCities: yup.string(),
        investorType: yup.array().min(1, 'At least one investor type is required').required('Investor Types is required'),
        accreditedInvestor: yup.array().min(1, 'Accredited investor is required').required('Accredited investor is required'),
        investmentSectors: yup.array().min(1, 'At least one investment sector is required').required('Investment sectors is required'),
        pastInvestmentSize: yup.string().required('Past Investment Size is required'),
        portfolioCompanies: yup.string().required('Portfolio Companies is required'),
        aumValue: yup.string().required('AUM Value is required'),
        dealsSize: yup.array().min(1, 'Deals Plan is required').required('Deals Plan is required'),
        investmentSize: yup.array().min(1, 'Investment Size is required').required('Investment Size is required'),
        investmentStages: yup.array().min(1, 'At least one investment stage is required').required('Investment Stages is required'),
        geographies: yup.array().min(1, 'At least one Geographies is required').required('Geographies is required'),
        hobbies: yup.string().required('Hobbies is required'),
        heardAboutUs: yup.string().required('How did you hear about us is required'),
        whyInterest: yup.string().required('Why did you intrested us?'),
    });

    const onClose = () => {
        navigation.goBack();
    };

    const goRegister = values => {
        register(dispatch, {
            ...values,
            accreditedInvestor: values.accreditedInvestor[0],
            dealsSize: values.dealsSize[0],
            investmentSize: values.investmentSize[0],
        })
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
                        telegram: '',
                        linkedin: '',
                        companyName: '',
                        companyWebsite: '',
                        jobTitle: '',
                        shortBio: '',
                        cityOfResidency: '',
                        countryOfResidency: '',
                        visitedCities: '',
                        investorType: [],
                        accreditedInvestor: [],
                        investmentSectors: [],
                        pastInvestmentSize: '',
                        portfolioCompanies: '',
                        aumValue: '',
                        dealsSize: [],
                        investmentSize: [],
                        investmentStages: [],
                        geographies: [],
                        hobbies: '',
                        heardAboutUs: '',
                        whyInterest: '',
                    }}
                    onSubmit={goRegister}>
                    {({handleChange, handleSubmit, values, errors, isValid}) => (
                        <>
                            <View style={[STYLES.row, STYLES.sb, STYLES.wFull]}>
                                <Button title="Back" type="clear" titleStyle={{color: theme.colors.error}} onPress={onClose} />
                                <Button title="Submit" type="clear" onPress={handleSubmit} />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={STYLES.mv12}>
                                    Account details are used for approving investors to events and effective matchmaking with co-investors, deals, requests and
                                    offers
                                    {errors.investorType}
                                </Text>
                                <View style={STYLES.mt12}>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Email</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input placeholder="Enter your email" value={email} />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>First name</Text>
                                        <Text style={styles.requiredText}>Required</Text>
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
                                        <Text style={styles.requiredText}>Required</Text>
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
                                        <Text style={styles.fieldText}>WhatsApp / Mobile (+country-phone)</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder="+country-phone"
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        errorMessage={errors.phone}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Telegram (N/A if not available), we use Telegram for community groups</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder="@nickname"
                                        value={values.telegram}
                                        onChangeText={handleChange('telegram')}
                                        errorMessage={errors.telegram}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>LinkedIn URL</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder="Copy LinkedIn full URL"
                                        value={values.linkedin}
                                        onChangeText={handleChange('linkedin')}
                                        errorMessage={errors.linkedin}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Company name</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder=""
                                        value={values.companyName}
                                        onChangeText={handleChange('companyName')}
                                        errorMessage={errors.companyName}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Company website URL</Text>
                                    </View>
                                    <Input placeholder="" value={values.companyWebsite} onChangeText={handleChange('companyWebsite')} />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Job title</Text>
                                    </View>
                                    <Input value={values.jobTitle} onChangeText={handleChange('jobTitle')} />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Short Bio</Text>
                                    </View>
                                    <Input
                                        multiline
                                        placeholder="Your bio will be presented on your Investor Profile so other members could learn more about you and reach out"
                                        style={{height: 130}}
                                        value={values.shortBio}
                                        onChangeText={handleChange('shortBio')}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>City of residency</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder=""
                                        value={values.cityOfResidency}
                                        onChangeText={handleChange('cityOfResidency')}
                                        errorMessage={errors.cityOfResidency}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Country of residency</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder=""
                                        value={values.countryOfResidency}
                                        onChangeText={handleChange('countryOfResidency')}
                                        errorMessage={errors.countryOfResidency}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>What are your frequently visited cities?</Text>
                                    </View>
                                    <Input
                                        placeholder="We can support you with introductions in these"
                                        value={values.visitedCities}
                                        onChangeText={handleChange('visitedCities')}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Investor type</Text>
                                        <Text style={styles.requiredText}>Required</Text>
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
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Accredited investor</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.accreditedInvestor && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.accreditedInvestor}
                                        </Text>
                                    )}
                                    <View>
                                        <FieldArray name="accreditedInvestor">
                                            {({push, remove}) => (
                                                <Selector
                                                    data={['Yes', 'No', 'Not Sure']}
                                                    selectedItems={values.accreditedInvestor}
                                                    onAdd={item => {
                                                        values.accreditedInvestor?.map((item, index) => remove(index));
                                                        push(item);
                                                    }}
                                                />
                                            )}
                                        </FieldArray>
                                    </View>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Investment sectors</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.investmentSectors && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.investmentSectors}
                                        </Text>
                                    )}
                                    <FieldArray name="investmentSectors">
                                        {({push, remove}) => (
                                            <Selector
                                                data={INVESTMENT_SECTORS}
                                                selectedItems={values.investmentSectors}
                                                onAdd={item => {
                                                    if (values.investmentSectors.includes(item)) {
                                                        remove(values.investmentSectors.indexOf(item));
                                                    } else {
                                                        push(item);
                                                    }
                                                }}
                                            />
                                        )}
                                    </FieldArray>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>How many investments have you made so far? (Type number)</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder=""
                                        value={values.pastInvestmentSize}
                                        onChangeText={handleChange('pastInvestmentSize')}
                                        errorMessage={errors.pastInvestmentSize}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Portfolio companies</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        multiline
                                        placeholder="Share names of portfolio companies (bullets or comma separated)"
                                        value={values.portfolioCompanies}
                                        onChangeText={handleChange('portfolioCompanies')}
                                        errorMessage={errors.portfolioCompanies}
                                        style={{height: 80}}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>What is your AUM $ value (Assets Under management in USD)?</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        placeholder=""
                                        value={values.aumValue}
                                        onChangeText={handleChange('aumValue')}
                                        errorMessage={errors.aumValue}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>How many deals do you plan to make in the next 12 months?</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.dealsSize && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.dealsSize}
                                        </Text>
                                    )}
                                    <View>
                                        <FieldArray name="dealsSize">
                                            {({push, remove}) => (
                                                <Selector
                                                    data={DEAL_SIZE}
                                                    selectedItems={values.dealsSize}
                                                    onAdd={item => {
                                                        values.dealsSize?.map((item, index) => remove(index));
                                                        push(item);
                                                    }}
                                                />
                                            )}
                                        </FieldArray>
                                    </View>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Average investment size per company?</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.investmentSize && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.investmentSize}
                                        </Text>
                                    )}
                                    <View>
                                        <FieldArray name="investmentSize">
                                            {({remove, push}) => (
                                                <Selector
                                                    data={INVESTMENT_SIZE}
                                                    selectedItems={values.investmentSize}
                                                    onAdd={item => {
                                                        values.investmentSize?.map((item, index) => remove(index));
                                                        push(item);
                                                    }}
                                                />
                                            )}
                                        </FieldArray>
                                    </View>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Investment stages</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.investmentStages && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.investmentStages}
                                        </Text>
                                    )}
                                    <View>
                                        <FieldArray name="investmentStages">
                                            {({remove, push}) => (
                                                <Selector
                                                    data={INVESTMENT_STAGES}
                                                    selectedItems={values.investmentStages}
                                                    onAdd={item => {
                                                        if (values.investmentStages.includes(item)) {
                                                            remove(values.investmentStages.indexOf(item));
                                                        } else {
                                                            push(item);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </FieldArray>
                                    </View>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Geographies</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    {errors.geographies && (
                                        <Text
                                            style={[
                                                styles.requiredText,
                                                {
                                                    color: theme.colors.error,
                                                    marginBottom: theme.spacing.sm,
                                                },
                                            ]}>
                                            {errors.geographies}
                                        </Text>
                                    )}
                                    <View>
                                        <FieldArray name="geographies">
                                            {({remove, push}) => (
                                                <Selector
                                                    data={GEOGRAPHIES}
                                                    selectedItems={values.geographies}
                                                    onAdd={item => {
                                                        if (values.geographies.includes(item)) {
                                                            remove(values.geographies.indexOf(item));
                                                        } else {
                                                            push(item);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </FieldArray>
                                    </View>
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                                        <Text style={styles.fieldText}>Hobbies and interests</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        multiline
                                        placeholder="Share your hobbies and interests to get match to others"
                                        value={values.hobbies}
                                        onChangeText={handleChange('hobbies')}
                                        errorMessage={errors.hobbies}
                                        style={{height: 80}}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>How did you hear about Deelio?</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        multiline
                                        placeholder="Were you referred by anyone? Please provide their name"
                                        value={values.heardAboutUs}
                                        onChangeText={handleChange('heardAboutUs')}
                                        errorMessage={errors.heardAboutUs}
                                        style={{height: 80}}
                                    />
                                </View>
                                <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Why are you interested in joining Deelio? What are your goals?</Text>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                    <Input
                                        multiline
                                        placeholder="Our mission is to help you grow and achieve your goals"
                                        value={values.whyInterest}
                                        onChangeText={handleChange('whyInterest')}
                                        errorMessage={errors.whyInterest}
                                        style={{height: 80}}
                                    />
                                </View>
                                {/* <View>
                                    <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                                        <Text style={styles.fieldText}>Upload your profile photo</Text>
                                    </View>
                                    <Input placeholder="Choose an image..." value="" />
                                </View> */}
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
}));
