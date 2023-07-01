import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import Dashboard from "../pages/Authenticated/Dashboard"
import Profile from "../pages/Authenticated/Profile"
import { IconButton, Text } from "react-native-paper"
import { Alert, Image } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createDrawerNavigator()

const DrawerStack = () => {
    return(
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
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
                    return <IconButton onPress={() => Alert.alert("To Profile")} style={{marginRight: 16}} icon={() => <Icon size={36} name="user-circle-o" />} />
                },
                headerStyle: {
                    backgroundColor: "#45A1FD",
                    height: 72
                },
                drawerPosition: "right"
            }}>
            <Tab.Screen name="Dashboard" component={Dashboard}/>
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default DrawerStack