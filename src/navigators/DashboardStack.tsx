import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import { Alert, Image, Pressable, View } from 'react-native'
import { IconButton, Text, TextInput } from "react-native-paper";
import * as navigation from '../navigators/RootNavigation'
import Dashboard from "../pages/Authenticated/Dashboard";
import Subject from "../pages/Authenticated/Subject";
import Map from "../pages/Authenticated/Map";
import Event from "../pages/Authenticated/Event";
import Group from "../pages/Authenticated/Group";
import Profile from "../pages/Authenticated/Profile";
import { Input } from "../components/Inputs";
import { useForm } from "react-hook-form";

const Tab = createBottomTabNavigator()

const DashboardStack = () => {
    const {control, handleSubmit} = useForm();

    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#F9F9FF',
                padding: 8
            },
            headerRight: () => {
                return <IconButton style={{backgroundColor: '#F9F9FF', marginRight: 24}} onPress={() => {Alert.alert("Notification", "WIP")}} icon={() => <IconFeather color="#FDB833" size={24} name="bell" />} />
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
            <Tab.Screen name="Subject" component={Subject}/>
            <Tab.Screen
            options={{
                headerShown: true,
                headerTitleContainerStyle: {
                    backgroundColor: '#45A1FD',
                },
                headerTitle: () => (
                    <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#F9F9FF',
                            padding: 8,
                            fontSize: 18,
                            // marginTop: 8,
                        }}>
                            Room
                        </Text>
                        <TextInput
                        placeholder="Room Name"
                        placeholderTextColor='#7FA8D2'
                        outlineColor="#FFFFFF"
                        activeOutlineColor="#296EB4"
                        textColor="#548BC3"
                        mode="outlined"

                        dense={true}

                        style={{
                            width: 192,
                        }} 
                        />
                    </View>
                ),
                headerRight: () => (<View></View>)
            }}
            name="Map"
            component={Map}/>
            <Tab.Screen name="Event" component={Event}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export default DashboardStack