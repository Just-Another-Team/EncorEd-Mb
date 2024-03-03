import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UIElements from "../pages/Debug/UserInferfaceElements";
import Landing from "../pages/Landing";
import Login from "../pages/Login";


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
        initialRouteName='Login'>
            <Stack.Screen
            name="Login"
            component={Login}/>

            <Stack.Screen
            name="UI"
            component={UIElements}/>

            {/* For Debugging Purposes ONLY! Must not be accessed by users */}
            {/* <Stack.Screen name="UI" component={UIElements} />
            <Stack.Screen name="Charts" component={GiftedCharts} />
            <Stack.Screen
            name="QR"
            component={QRScanner}
            options={{
                headerShown: true,
            }}/>
            <Stack.Screen name="LinkPage" component={DeepLink} /> */}

            {/* Legit Pages */}
            {/* <Stack.Screen 
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

            <Stack.Screen
            name="Notifications"
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#45A1FD",
                    
                },
                headerTintColor: "#FEFEFE"
            }}
            component={Notifications}/>

            <Stack.Screen
            name="Room"
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#45A1FD",
                    
                },
                headerTintColor: "#FEFEFE"
            }}
            component={SelectedRoom}/>

            <Stack.Screen
            name="Attendance"
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#45A1FD",
                    
                },
                headerTintColor: "#FEFEFE",
                headerTitle: "Add Attendance"
            }}
            component={Attendance}/> */}

        </Stack.Navigator>
    )
}

export default AuthStack