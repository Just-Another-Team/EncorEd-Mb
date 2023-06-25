import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { 
    StyleSheet,
    View,
    ScrollView
} from "react-native";
import { 
    Text,
    TextInput,
    Button
} from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign'
import * as navigation from "../navigators/RootNavigation";
import { Input } from "../components/Inputs";
import {useForm} from 'react-hook-form'

const RegisterPage = () => {
    const { control, handleSubmit } = useForm()

    type registrationObjects = {
        id: string, 
        placeHolder: string, 
        textContentType: 'givenName' | 'familyName' | 'emailAddress' | 'telephoneNumber' | 'password', 
        secureEntryText: boolean, 
        iconName: string;
        required:boolean
    };

    const inputs:registrationObjects[] = [
        {id: "firstname", placeHolder: "First name", required: true, textContentType: 'givenName', secureEntryText: false, iconName: "user"},
        {id: "lastname", placeHolder: "Last name", required: true, textContentType: 'familyName', secureEntryText: false, iconName: "user"},
        {id: "email", placeHolder: "Email", required: true, textContentType: 'emailAddress', secureEntryText: false, iconName: "mail"},
        {id: "phonenumber", placeHolder: "Phone number", required: true, textContentType: 'telephoneNumber', secureEntryText: false, iconName: "phone"},
        {id: "password", placeHolder: "Password", required: true, textContentType: 'password', secureEntryText: true, iconName: "lock"},
        {id: "confirmPassword", placeHolder: "Confirm Password", required: true, textContentType: 'password', secureEntryText: true, iconName: "lock"},
    ]

    const onSignInPressed = (data:any) => {
        console.log(data)
    }

    return(

        <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.container}>
        
                <View style={styles.loginContainer}>
                    <Text style={[styles.h5, styles.centerText, styles.textPrimary]}>Create Account</Text>      

                    {inputs.map((el, ind) =>
                        <Input 
                        key={el.id}
                        name={el.id}
                        placeHolder={el.placeHolder}
                        secureEntryText={el.secureEntryText}
                        textContentType={el.textContentType}
                        control={control}
                        icon={el.iconName}
                        required
                        />
                    )}
                    
                    <Button
                    mode="contained"
                    buttonColor="#296EB4"
                    textColor="#FDB833"
                    onPress={handleSubmit(onSignInPressed)}
                    labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                    style={{padding: 6, borderRadius: 128, marginTop: 32}}>
                        SIGN UP
                    </Button>
                </View>

                <Text
                style={[styles.p, {marginBottom: 32}]}>
                    Already have an account? <Text onPress={() => navigation.navigate("Login")} style={{color: '#FDB833', fontWeight: 'bold'}}>SIGN IN</Text>
                </Text>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#45A1FD',
        padding: 28
    },
    loginContainer: {
        backgroundColor: '#A2D0FE',
        width: '100%',
        borderRadius: 30,
        display: 'flex',
        gap: 16,
        marginTop: 32,
        padding: 24
    },
    centerText: {
        textAlign: 'center'
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    h4: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    h5: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#296EB4'
    },
    p: {
        fontSize: 18,
    },
    textPrimary: {
        color: '#296EB4'
    }
})

export default RegisterPage;