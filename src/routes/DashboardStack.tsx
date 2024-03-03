import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import { Alert, Image, Pressable, View } from 'react-native'
import { Badge, IconButton, Text, TextInput } from "react-native-paper";
import * as navigation from './RootNavigation'
import Dashboard from "../pages/Authenticated/Dashboard";
import Profile from "../pages/Authenticated/Profile";
import Report from "../pages/Authenticated/Report/Report";
import { useAppSelector } from "../app/encored-redux-hooks";
import IAttendance from "../types/IAttendance";

const Tab = createBottomTabNavigator()

const DashboardStack = () => {
    const role = useAppSelector(state => state.role.data)
    const attendances = useAppSelector(state => state.attendance.data)

    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#F9F9FF',
                padding: 8
            },
            headerRight: () => {
                return (
                    <View style={{marginRight: 24}}>
                        <IconButton
                        style={{backgroundColor: '#F9F9FF'}}
                        onPress={ (e) => { navigation.navigate("Notifications") } }
                        icon={() => <IconFeather color="#FDB833" size={24} name="bell" />}
                        />
                    </View>
                )
            },
            headerStyle: {
                backgroundColor: "#45A1FD",
                height: 72
            },
            tabBarIcon: ({focused, color, size}) => {
                let iconName: string = 'disc';

                if (route.name === "Home") iconName = 'home'
                else if (route.name === "Report") iconName = 'clipboard'
                else if (route.name === "Map") iconName = 'map'
                else if (route.name === "Event") iconName = 'calendar'
                else if (route.name === "Profile") iconName = 'user'

                return <IconFeather size={28} name={iconName} color={color} />
            },
            tabBarActiveTintColor: '#F9F9FF',
            tabBarActiveBackgroundColor: '#6DB6FD',
            tabBarInactiveTintColor: '#F9F9FF',
            tabBarLabelStyle: {
                fontWeight: 'bold'
            },
            tabBarStyle: {
                height: 64,
                backgroundColor: '#45A3FD'
            },
        })}>
            <Tab.Screen name="Home" component={Dashboard}/>
            <Tab.Screen name="Report" component={Report}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export default DashboardStack