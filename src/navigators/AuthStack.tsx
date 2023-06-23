import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../pages/Landing";
import Login from "../pages/Login";

export type AuthStackParamList = {
    Landing: undefined;
    Login: undefined
}

const AuthStack = () => {
    const Stack = createNativeStackNavigator<AuthStackParamList>();

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

        </Stack.Navigator>
    )
}

export default AuthStack