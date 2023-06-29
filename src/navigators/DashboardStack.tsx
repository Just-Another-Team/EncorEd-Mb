import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import { Alert, Image, Pressable, View } from 'react-native'
import { IconButton, Text } from "react-native-paper";
import * as navigation from '../navigators/RootNavigation'
import Dashboard from "../pages/Authenticated/Dashboard";
import Subject from "../pages/Authenticated/Subject";
import Map from "../pages/Authenticated/Map";
import Event from "../pages/Authenticated/Event";
import Group from "../pages/Authenticated/Group";

const Tab = createBottomTabNavigator()

const DashboardStack = () => {

    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            headerTitle: () => {
                return <Text style={{fontSize: 32, fontWeight: "700", color: '#296EB4'}}>Encor<Text style={{fontWeight: '700', color: '#FDB833'}}>Ed</Text></Text>
            },
            headerTitleAlign:"center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => {
                return <Image style={{width: 48, height: 48, marginLeft: 16}} source={require('../images/Logo.png')} />
            },
            headerRight: () => {
                return <IconButton onPress={() => navigation.navigate("Profile")} style={{marginRight: 16}} icon={() => <Icon size={36} name="user-circle-o" />} />
            },
            headerStyle: {
                backgroundColor: "#45A1FD",
                height: 72
            },

            tabBarIcon: ({focused, color, size}) => {
                let iconName: string = 'disc';

                if (route.name === "Home") iconName = 'home'
                else if (route.name === "Subject") iconName = 'book'
                else if (route.name === "Map") iconName = 'map'
                else if (route.name === "Event") iconName = 'calendar'
                else if (route.name === "Groups") iconName = 'users'

                return <IconFeather size={28} name={iconName} color={color} />
            },
            tabBarActiveTintColor: '#F9F9FF',
            tabBarActiveBackgroundColor: '#A9C5E1',
            tabBarInactiveTintColor: '#A9C5E1',
            tabBarLabelStyle: {
                fontWeight: 'bold'
            },
            tabBarStyle: {
                height: 64,
                backgroundColor: '#548BC3'
            },
        })}
        >
            <Tab.Screen name="Home" component={Dashboard}/>
            <Tab.Screen name="Subject" component={Subject}/>
            <Tab.Screen name="Map" component={Map}/>
            <Tab.Screen name="Event" component={Event}/>
            <Tab.Screen name="Groups" component={Group}/>
        </Tab.Navigator>
    )
}

export default DashboardStack