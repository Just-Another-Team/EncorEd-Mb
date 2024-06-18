import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native'
import { Badge, IconButton } from "react-native-paper";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import QRScanner from "../pages/QRScanner";
import Icon from "react-native-paper/src/components/Icon";
import Color from "../assets/styles/Color";
import { NotificationButtonTheme } from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator()

const NotificationButton = () => {
    const { navigate } = useNavigation()

    return (
        <View style={{marginRight: 4}}>
            <IconButton
            theme={NotificationButtonTheme}
            mode="contained"
            icon="bell-outline"
            onPress={() => navigate("Notifications")}/>
            <Badge
            visible={false}
            style={{
                position: 'absolute',
                top: 4,
                right: 0,
            }}>
                3
            </Badge>
        </View>
    )
}

const UserStack = () => {
    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#F9F9FF',
            },
            //headerRight: NotificationButton,
            headerStyle: {
                backgroundColor: "#45A1FD",
                height: 72
            },
            tabBarIcon: ({color}) => {
                let iconName = 'disc';

                if (route.name === "Home") iconName = 'home-outline'
                else if (route.name === "QR") iconName = 'qrcode-scan'
                else if (route.name === "Profile") iconName = 'account-outline'

                return <Icon size={28} source={iconName} color={color} />
            },
            tabBarActiveTintColor: '#F9F9FF',
            tabBarActiveBackgroundColor: '#6DB6FD',
            tabBarInactiveTintColor: '#F9F9FF',
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarStyle: {
                height: 64,
                backgroundColor: '#45A3FD'
            },
        })}>
            <Tab.Screen name="Home" component={Home}/>
            {/* <Tab.Screen name="Home" component={Dashboard}/>
            <Tab.Screen name="Report" component={Report}/>
            <Tab.Screen name="Profile" component={Profile}/> */}
            <Tab.Screen name="QR" component={QRScanner}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export default UserStack