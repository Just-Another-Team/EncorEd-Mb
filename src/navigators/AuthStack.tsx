import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Alert, Image, Pressable, View } from 'react-native'
import { IconButton, Text } from "react-native-paper";
import * as navigation from '../navigators/RootNavigation'
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import DashboardStack from "./DashboardStack";
import Profile from "../pages/Authenticated/Profile";


const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: '#5BA4ED'
            }
        }}
        initialRouteName='Landing'>

            <Stack.Screen 
            name='Landing' 
            component={Landing} />

            <Stack.Screen 
            name='Login' 
            component={Login} />

            <Stack.Screen 
            name="Register"
            component={RegisterPage}/>

            {/* Must be in another stack navigator*/}
            <Stack.Screen
            name="LoggedIn"
            component={DashboardStack}/>

            {/* <Stack.Screen
            name="Profile"
            options={{
                headerShown: true,
                headerTitle: () => {
                    return <Text style={{fontSize: 32, fontWeight: "700", color: '#296EB4', padding: 14}}>Encor<Text style={{fontWeight: '700', color: '#FDB833'}}>Ed</Text></Text>
                },
                headerTitleAlign:"center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackVisible: false,
                headerLeft: () => {
                    return <Image style={{width: 48, height: 48}} source={require('../images/Logo.png')} />
                },
                headerRight: () => {
                    return <IconButton onPress={() => navigation.navigate("Profile")} icon={() => <Icon size={36} name="user-circle-o" />} />
                },
                headerStyle: {
                    backgroundColor: "#45A1FD",
                },
                contentStyle: {
                    backgroundColor: '#F6F5FF'
                }
            }}
            component={Profile}/> */}

        </Stack.Navigator>
    )
}

export default AuthStack