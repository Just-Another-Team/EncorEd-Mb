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
import DrawerStack from "./DrawerStack";
import SelectedItem from "../pages/Authenticated/SelectedItem";


const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: '#FBFBFB'
            }
        }}
        initialRouteName='Landing'>

            <Stack.Screen 
            name='Landing'
            options={{
                headerShown: true,
                headerTitle: () => {
                    return (
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            padding: 4
                        }}>
                            <Image
                            source={require('../images/Logo.png')}
                            style={{
                                width: 64,
                                height: 64
                            }}/>
                            <Text style={{fontSize: 32, fontWeight: "700", color: '#296EB4'}}>Encor<Text style={{fontWeight: '700', color: '#FDB833'}}>Ed</Text></Text>
                        </View>
                    )
                },
                contentStyle: {
                    justifyContent: 'center',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false
            }}
            component={Landing} />

            <Stack.Screen 
            name='Login'
            component={Login} />

            <Stack.Screen 
            name="Register"
            component={RegisterPage}/>

            <Stack.Screen
            name="LoggedIn"
            component={DashboardStack}/>

            {/* Log in as Guest */}

            <Stack.Screen name="SelectedItem" component={SelectedItem} options={{
                headerStyle: {
                    backgroundColor: "#45A1FD",
                },
                contentStyle: {
                    backgroundColor: '#FFFFFF'
                }
            }}/>

        </Stack.Navigator>
    )
}

export default AuthStack