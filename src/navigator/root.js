import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnalysisScreen from '../screens/Analysis';
import DealListScreen from '../screens/DealList';
import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

function RootNavigator() {
    const {theme} = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
            }}
            initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={DealListScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Analysis"
                component={AnalysisScreen}
                options={{
                    tabBarLabel: 'Analysis',
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="dashboard" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Signed"
                component={DealListScreen}
                options={{
                    tabBarLabel: 'My Deals',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5
                            name="handshake"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default RootNavigator;
