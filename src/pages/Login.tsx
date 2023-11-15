import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
} from 'react-native'
import {
    ActivityIndicator,
    Button,
    MD2Colors,
    TextInput
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import * as navigation from '../navigators/RootNavigation'
import {SubmitHandler, useForm} from 'react-hook-form'
import { Credentials, TextInputProps } from "../types/input"
import { Input } from "../components/Inputs"
import { ScrollView } from "react-native"
import { Logo } from "../types/images"
import { getUser, logIn, resetUser, signIn } from "../app/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../app/encored-redux-hooks"
import { getInstitution, logOutInsitution } from "../app/features/institution/institutionSlice"
import { getRole } from "../app/features/role/roleSlice"

const Login = () => {
    const logindispatch = useAppDispatch();

    const userLoading = useAppSelector(state => state.authentication.loading)
    const roleLoading = useAppSelector(state => state.role.loading)
    const institutionLoading = useAppSelector(state => state.institution.loading)

    const { 
        control,
        reset,
        handleSubmit,
        formState: {errors},
        setError,
        watch
    } = useForm({
        defaultValues: {
            emailUserName: '',
            password: ''
        }
    })

    const inputs:TextInputProps[] = [
        {id: "emailUserName", placeHolder: "Email", textContentType: 'emailAddress', secureEntryText: false, icon: "mail", formError: errors.emailUserName},
        {id: "password", placeHolder: "Password", textContentType: 'password', secureEntryText: true, icon: "lock", formError: errors.password},
    ]

    const requiredErrorHandler = (el: TextInputProps) => {
        if (el.id === "emailUserName") return "Email is required!";
        if (el.id === "password") return "Password is required!"
    }

    const authenticationHandler:SubmitHandler<{emailUserName: string; password: string}> = (data) => {

        const userCredentials: Credentials = {
            email: data.emailUserName,
            password: data.password
        }
        console.log("Data Logged In", userCredentials)

        //GET USER
        logindispatch(getUser(userCredentials.email)).unwrap()
            .then((getUserRes) => {
                return logindispatch(signIn(userCredentials)).unwrap()
                    .then(() => {
                        //Get Institution
                        return logindispatch(getInstitution(getUserRes.data.institution)).catch(error => Promise.reject(error))
                    })
                    .then(() => {
                        //Get Role
                        //If it does not have any teacher or student roles. Then error
                        return logindispatch(getRole(getUserRes.data.id)).unwrap().then((res) => {
                            if (res.find((role: any) => role.appAdmin || role.admin || !!role.employee || !!role.visitor) != undefined) return Promise.reject("auth/user-invalid-role")
                        }).catch(error => Promise.reject(error)).catch(error => Promise.reject(error))
                    })
                    .then(() => {
                        logindispatch(logIn(getUserRes.data))
                        navigation.navigate("LoggedIn")
                        reset();
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.log(error)

                if (error.code === "ERR_BAD_REQUEST" && error.response.data.code === "firestore/missing-email") setError("emailUserName", {message: "Email not found in the system's database. Please register"})

                if (error.code === 'auth/missing-email') setError("emailUserName", {message: "Email not found in the system's database. Please register"})

                if (error.code === "auth/network-request-failed") setError("emailUserName", {message: "Cannot log in. Please check your internet connection."})

                if (error.code === "ERR_NETWORK") setError("emailUserName", {message: `${error.message}.`})

                if (error.code === "auth/too-many-requests") setError("emailUserName", {message: `${error.message}.`})

                if (error.code === "auth/user-invalid-role" || error === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the mobile"})

                if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") setError("emailUserName", {message: "Invalid email"})

                if (error.code === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    useEffect(() => {
        logindispatch(resetUser())
        logindispatch(logOutInsitution())
    }, [])

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
                    <Text
                    style={{
                        fontSize: 36,
                        fontWeight: "700",
                        color: '#296EB4',
                    }}>
                        Encor
                        <Text
                        style={{
                            fontWeight: '700',
                            color: '#FDB833'
                        }}>Ed</Text>
                    </Text>
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

                        formError={el.formError}

                        watch={watch}

                        rules={{
                            required: `${el.placeHolder} is required`
                        }}
                        />
                    )}
                    
                    <Button
                    mode="contained"
                    buttonColor="#296EB4"
                    textColor="#FDB833"
                    onPress={handleSubmit(authenticationHandler)}
                    loading={userLoading || roleLoading || institutionLoading}
                    disabled={userLoading || roleLoading || institutionLoading}
                    labelStyle={{fontSize: 18, fontWeight: 'bold'}}
                    style={{padding: 6,borderRadius: 128, marginTop: 32}}>
                        {userLoading || roleLoading || institutionLoading ? "LOADING" : "LOGIN"}
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