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
    Button,
    Checkbox
} from "react-native-paper";
import * as navigation from "../navigators/RootNavigation";
import { Input } from "../components/Inputs";
import { useForm } from 'react-hook-form'
import { TextInputProps } from "../types/input";

const RegisterPage = () => {
    const { control, handleSubmit } = useForm()

    const [checked, setChecked] = useState(false)

    const inputs:TextInputProps[] = [
        {id: "firstname", placeHolder: "First name", textContentType: 'givenName', secureEntryText: false, icon: "user"},
        {id: "lastname", placeHolder: "Last name", textContentType: 'familyName', secureEntryText: false, icon: "user"},
        {id: "email", placeHolder: "Email", textContentType: 'emailAddress', secureEntryText: false, icon: "mail"},
        {id: "birthdate", placeHolder: "Birth date", icon: "phone"},
        {id: "phonenumber", placeHolder: "Phone number", textContentType: 'telephoneNumber', secureEntryText: false, icon: "phone"},
        {id: "password", placeHolder: "Password", textContentType: 'password', secureEntryText: true, icon: "lock"},
        {id: "confirmPassword", placeHolder: "Confirm Password", textContentType: 'password', secureEntryText: true, icon: "lock"},
    ]

    const errorHandler = (el: TextInputProps) => {
        if (el.id === "firstname") return "First name is required!";
        if (el.id === "lastname") return "Last name is required!"
        if (el.id === "email") return "Email is required!";
        if (el.id === "phonenumber") return "Phonenumber is required!";
        if (el.id === "password") return "Password is required!"
        if (el.id === "confirmPassword") return "Confirm Password is required!" //Change this. Make sure it matches with the password
    }

    const onSignInPressed = (data:any) => {
        console.log(data);

        navigation.navigate("LoggedIn");
    }

    return(
        <ScrollView contentContainerStyle={{ padding: 28}}>
            <View style={styles.container}>
        
                <View style={styles.loginContainer}>
                    <Text style={[styles.h5, styles.centerText, styles.textPrimary]}>Create Account</Text>      

                    {inputs.map((el, ind) => {

                        if (el.id === "birthdate")
                            return (
                                <Text>{el.placeHolder}</Text>
                            )

                        return(
                            <Input 
                            key={el.id}
                            name={el.id}
                            placeHolder={el.placeHolder}
                            secureEntryText={el.secureEntryText}
                            textContentType={el.textContentType}
                            control={control}
                            icon={el.icon}
                            rules={{required: errorHandler(el)}}
                            />
                        )
                    }
                    )}
                    
                    {/* Birthdate, Selecting a Campus Affiliated, Selecting Student-Faculty-Employee, If Student: Enter Course and year, Submit ID */}

                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                        <Checkbox   
                        status={checked ? 'checked' : 'unchecked'}
                        color="#296EB4"
                        uncheckedColor="#296EB4"
                        onPress={() => setChecked(!checked)}
                        />
                        <Text style={{color: "#1F1F29", fontSize: 16}}>
                            Agree with <Text style={{color: '#296EB4', fontWeight: 'bold'}}>Terms and Conditions</Text>
                        </Text>
                    </View>

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
                style={[styles.p]}>
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
    },
    loginContainer: {
        backgroundColor: '#A2D0FE',
        width: '100%',
        borderRadius: 30,
        display: 'flex',
        gap: 16,
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