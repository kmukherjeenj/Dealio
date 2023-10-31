import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {makeStyles, Text, Button, useThemeMode, useTheme} from '@rneui/themed';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import {STYLES} from '../global/styles';
import Selector from '../components/Selector';
import {DEAL_SIZE, GEOGRAPHIES, INVESTMENT_SECTORS, INVESTMENT_SIZE, INVESTMENT_STAGES} from '../constant/mock-data';

export default function EditAccountScreen({navigation}) {
    const styles = useStyles();
    const {theme} = useTheme();
    const {setMode, mode} = useThemeMode();
    const [disabled, setDisabled] = useState(true);
    const [checked, setChecked] = useState(false);
    const [code, setCode] = useState('');
    const [accredited, setAccredited] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [deals, setDeals] = useState([]);
    const [investmentSize, setInvestmentSize] = useState([]);
    const [investmentStages, setInvestmentStages] = useState([]);
    const [geographies, setGeographies] = useState([]);

    const onClose = () => {
        // setMode(mode === 'dark' ? 'light' : 'dark');
    };

    const goList = () => {
        navigation.navigate('DealList');
    };

    const onAddAccredited = (item) => {
        setAccredited([item]);
    };

    const onAddSectors = (item) => {
        if (sectors.includes(item)) {
            setSectors(sectors.filter((el) => el !== item));
        } else {
            setSectors([...sectors, item]);
        }
    };

    const onAddDeals = (item) => {
        setDeals([item]);
    };

    const onAddInvestmentSize = (item) => {
        setInvestmentSize([item]);
    };

    const onAddInvestmentStages = (item) => {
        if (investmentStages.includes(item)) {
            setInvestmentStages(investmentStages.filter((el) => el !== item));
        } else {
            setInvestmentStages([...investmentStages, item]);
        }
    };

    const onAddGeographies = (item) => {
        if (geographies.includes(item)) {
            setGeographies(geographies.filter((el) => el !== item));
        } else {
            setGeographies([...geographies, item]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={[STYLES.row, STYLES.sb, STYLES.wFull]}>
                    <Button
                        title="Cancel"
                        type="clear"
                        titleStyle={{color: theme.colors.error}}
                        onPress={onClose}
                    />
                    <Button
                        title="Submit"
                        type="clear"
                        onPress={goList}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={STYLES.mv12}>Account details are used for approving investors to events and effective matchmaking with co-investors, deals, requests and offers</Text>
                    <View style={STYLES.mt12}>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Email</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="Enter your emal"
                            value="apexcup199096@gmail.com"
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>First name</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="Enter your first name"
                            value="Apex"
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Last name</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="Enter your last name"
                            value="Cup"
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>WhatsApp / Mobile (+country-phone)</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="+country-phone"
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Telegram (N/A if not available), we use Telegram for community groups</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="@nickname"
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>LinkedIn URL</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder="Copy LinkedIn full URL"
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Company name</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder=""
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Company website URL</Text>
                        </View>
                        <Input />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Job title</Text>
                        </View>
                        <Input />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Short Bio</Text>
                        </View>
                        <Input
                            multiline
                            placeholder="Your bio will be presented on your Investor Profile so other members could learn more about you and reach out"
                            style={{height: 130}}
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>City of residency</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder=""
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Country of residency</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder=""
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>What are your frequently visited cities?</Text>
                        </View>
                        <Input placeholder="We can support you with introductions in these" />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Investor type</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Business Angel (investing my own capital into startups' equity)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Corporate VC - General Partner or Managing Partner or Partner (investing corporate capital)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Crypto Fund - General Partner or Managing Partner or Partner (investing LP capital)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Family Office Investment Manager (investing FO capital)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Hedge Fund - General Partner or Managing Partner or Partner (investing LP capital)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Institutional Investor - Investment Manager</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Limited partner (investing my own capital into funds)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Real Estate Investor or Real Estate Fund Manager</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Sovereign Wealth - Investment Manager</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>Sponsor (company interested to offer services to investors or their portfolio companies)</Text>
                        </View>
                        <View style={[STYLES.row, STYLES.mb12]}>
                            <Checkbox
                                color={checked ? theme.colors.primary : theme.colors.grey4}
                                value={checked}
                                onValueChange={setChecked}
                            />
                            <Text style={[STYLES.ml12, styles.checkboxText]}>VC Fund - General partner or Managing Partner or Partner (investing LP capital)</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>Accredited investor</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={['Yes', 'No', 'Not Sure']}
                                selectedItems={accredited}
                                onAdd={onAddAccredited}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>Investment sectors</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={INVESTMENT_SECTORS}
                                selectedItems={sectors}
                                onAdd={onAddSectors}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>How many investments have you made so far? (Type number)</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            placeholder=""
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Protfolio companies</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            multiline
                            placeholder="Share names of portfolio companies (bullets or comma separated)"
                            value=""
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
                            value=""
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>How many deals do you plan to make in the next 12 months?</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={DEAL_SIZE}
                                selectedItems={deals}
                                onAdd={onAddDeals}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>Average investment size per company?</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={INVESTMENT_SIZE}
                                selectedItems={investmentSize}
                                onAdd={onAddInvestmentSize}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>Investment stages</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={INVESTMENT_STAGES}
                                selectedItems={investmentStages}
                                onAdd={onAddInvestmentStages}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8, STYLES.mt20]}>
                            <Text style={styles.fieldText}>Geographies</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <View>
                            <Selector
                                data={GEOGRAPHIES}
                                selectedItems={geographies}
                                onAdd={onAddGeographies}
                            />
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
                            value=""
                            style={{height: 80}}
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>How did you hear about Dealio?</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            multiline
                            placeholder="Were you referred by anyone? Please provide their name"
                            value=""
                            style={{height: 80}}
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Why are you interested in joining Dealio? What are your goals?</Text>
                            <Text style={styles.requiredText}>Required</Text>
                        </View>
                        <Input
                            multiline
                            placeholder="Our mission is to help you grow and achieve your goals"
                            value=""
                            style={{height: 80}}
                        />
                    </View>
                    <View>
                        <View style={[STYLES.row, STYLES.sb, STYLES.mb8]}>
                            <Text style={styles.fieldText}>Upload your profile photo</Text>
                        </View>
                        <Input
                            placeholder="Choose an image..."
                            value=""
                        />
                    </View>
                    <View style={{height: 150}} />
                </ScrollView>
            </View>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingTop: 50,
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
