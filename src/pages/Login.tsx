import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
} from 'react-native'
import {
    Button,
    TextInput
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import * as navigation from '../navigators/RootNavigation'
import {useForm} from 'react-hook-form'
import { TextInputProps } from "../types/input"
import { Input } from "../components/Inputs"
import { ScrollView } from "react-native"
import { Logo } from "../types/images"

const Login = () => {
    const defaultVal = {
        email: '',
        password: ''
    }

    const { 
        control,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const inputs:TextInputProps[] = [
        {id: "email", placeHolder: "Email", textContentType: 'emailAddress', secureEntryText: false, icon: "mail"},
        {id: "password", placeHolder: "Password", textContentType: 'password', secureEntryText: true, icon: "lock"},
    ]

    const errorHandler = (el: TextInputProps) => {
        if (el.id === "email") return "Email is required!";
        if (el.id === "password") return "Password is required!"
    }

    const authenticationHandler = (data: object) => {
        console.log(data)

        reset(defaultVal)
        navigation.navigate("LoggedIn")
    }

    return(
        <ScrollView style={{paddingTop: 36, paddingBottom: 36, paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.container}>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    padding: 4,
                }}>
                    <Image
                    source={require('../images/Logo.png')}
                    style={{
                        width: 72,
                        height: 72
                    }}/>
                    <Text style={{fontSize: 36, fontWeight: "700", color: '#296EB4'}}>Encor<Text style={{fontWeight: '700', color: '#FDB833'}}>Ed</Text></Text>
                </View>
            
                <View style={styles.loginContainer}>
                    <Text style={[styles.h5, styles.centerText, styles.textPrimary]}>Login Account</Text>         

                    {inputs.map((el, ind) => 
                        <Input 
                        key={el.id}
                        name={el.id}
                        placeHolder={el.placeHolder}
                        secureEntryText={el.secureEntryText}
                        textContentType={el.textContentType}
                        control={control}
                        icon={el.icon}
                        rules={{
                            required: errorHandler(el)
                        }}
                        />
                    )}
                    
                    <Button
                    mode="contained"
                    buttonColor="#296EB4"
                    textColor="#FDB833"
                    onPress={handleSubmit(authenticationHandler)}
                    labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                    style={{padding: 6, borderRadius: 128, marginTop: 32}}>
                        LOGIN
                    </Button>
                </View>

                <View style={{width: '100%', padding: 24}}>
                    <Text style={[styles.p, {fontSize: 20, textAlign: 'center'}]}>Don't have an account?</Text>
                    <Button
                        mode="outlined"
                        textColor="#296EB4"
                        labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                        style={{padding: 6, borderColor: '#296EB4', borderRadius: 128, marginTop: 10}}
                        onPress={() => {Alert.alert("WIP", "This feature is still work in progress")}}>
                            SIGN IN AS GUEST
                    </Button>
                </View>
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
        paddingTop: 32
    },
    loginContainer: {
        backgroundColor: '#A2D0FE',
        width: '100%',
        borderRadius: 30,
        display: 'flex',
        gap: 16,
        marginTop: 48,
        marginBottom: 32,
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
        color: '#296EB4'
    },
    textPrimary: {
        color: '#296EB4'
    }
})

export default Login