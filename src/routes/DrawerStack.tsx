import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import Dashboard from "../pages/Authenticated/Dashboard"
import Profile from "../pages/Profile"
import { IconButton, Text } from "react-native-paper"
import { Alert, Image } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { Logo } from "../types/images"

const Drawer = createDrawerNavigator()

const DrawerStack = () => {
    return(
        <Drawer.Navigator
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
                    return <Image style={{width: 48, height: 48, marginLeft: 16}} source={Logo} />
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
            <Drawer.Screen name="Dashboard" component={Dashboard}/>
            
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    )
}

export default DrawerStack