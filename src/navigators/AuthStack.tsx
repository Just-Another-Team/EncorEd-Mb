import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import Dashboard from "../pages/Authenticated/Dashboard";

import Icon from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native'

import { Button, IconButton, Text } from "react-native-paper";

const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName='Landing'>

            <Stack.Screen 
            name='Landing' 
            options={{
                headerShown: false
            }}
            component={Landing} />

            <Stack.Screen 
            name='Login' 
            options={{
                headerShown: false
            }}
            component={Login} />

            <Stack.Screen 
            name="Register"
            options={{
                headerShown: false
            }}
            component={RegisterPage}/>

            {/* Must be in another stack navigator*/}
            <Stack.Screen
            name="Home"
            options={{
                headerTitle: () => {
                    return <Text style={{fontSize: 32, fontWeight: "700", color: '#296EB4', padding: 12}}>Encor<Text style={{fontWeight: '700', color: '#FDB833'}}>Ed</Text></Text>
                },
                headerLeft: () => {
                    return <Image style={{width: 48, height: 48}} source={require('../images/Logo.png')} />
                },
                headerRight: () => {
                    return <IconButton icon={() => <Icon size={36} name="user-circle-o" />} />
                },
                headerStyle: {
                    backgroundColor: "#45A1FD",
                },
                headerTitleAlign:"center",
                headerTintColor: "#296EB4",
                headerBackButtonMenuEnabled: false,
                headerBackVisible: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: true,
            }}
            component={Dashboard}/>

        </Stack.Navigator>
    )
}

export default AuthStack