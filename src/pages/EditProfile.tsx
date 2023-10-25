import React from 'react'
import {ScrollView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { TextInputProps } from '../types/input'
import { Input } from '../components/Inputs'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../app/encored-redux-hooks'
import { updateUser } from '../app/features/auth/authSlice'
import { navigate } from '../navigators/RootNavigation'

const EditProfile = () => {

    const user = useAppSelector(state => state.authentication.user)

    const editUserDispatch = useAppDispatch()

    const { 
        control,
        getValues,
        reset,
        handleSubmit,
        formState: {errors},
        setError,
        watch
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
        }
    })

    const inputs:TextInputProps[] = [
        // {id: "emailUserName", placeHolder: "Email", textContentType: 'emailAddress', secureEntryText: false, icon: "mail", formError: errors.emailUserName, rules: {required: "First name is required"}},
        // {id: "password", placeHolder: "Password", textContentType: 'password', secureEntryText: true, icon: "lock", formError: errors.password, rules: {required: "First name is required"}},
        {id: 'firstName', placeHolder: "First name", textContentType: "name", secureEntryText: false, formError: errors.firstName, rules: {required: "First name is required"}},
        {id: 'lastName', placeHolder: "Last name", textContentType: "name", secureEntryText: false, formError: errors.lastName, rules: {required: "Last name is required"}},
        {id: 'email', placeHolder: "Email", textContentType: "emailAddress", secureEntryText: false,  formError: errors.email, rules: {required: "Email is required"}},
        {id: 'userName', placeHolder: "Username", textContentType: "name", secureEntryText: false, formError: errors.userName, rules: {required: "Username is required"}},
        {id: 'password', placeHolder: "New Password", textContentType: "password", secureEntryText: true, formError: errors.password},
        {id: 'confirmPassword', placeHolder: "Confirm New Password", textContentType: "password", secureEntryText: true, formError: errors.confirmPassword, }, 
    ]

    const handleEditProfile = (data: object) => {
        const {firstName, lastName, userName, email, password} = data

        const input = {
            id: user?.id,
            firstName,
            lastName,
            email,
            password
        }

        // WHAT IF SAME EMAIL?
        // editUserDispatch(updateUser(input)).unwrap()
        //     .then(() => {
        //         //editUserDispatch(updateLoggedInUser({firstName, lastName, email, password, userName, displayName: `${firstName} ${lastName}`}))
        //         // navigate(0)
        //         navigate('Profile')
        //         reset()
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    return(
        <ScrollView style={{padding: 0}}>
            <View style={{backgroundColor: '#A9C5E1', height: 256, zIndex: 0}}>
            </View>

            <View style={{zIndex: 1}}>
                <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginBottom: 8}}>

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

                        rules={el.rules}
                        />
                    )}

                    <Button
                    mode="contained"
                    buttonColor="#296EB4"
                    textColor="#FDB833"
                    onPress={handleSubmit(handleEditProfile)}
                    // loading={userLoading || roleLoading || institutionLoading}
                    // disabled={userLoading || roleLoading || institutionLoading}
                    labelStyle={{fontSize: 18, fontWeight: 'bold'}}
                    style={{padding: 6,borderRadius: 128, marginTop: 32}}>
                        {/* {userLoading || roleLoading || institutionLoading ? "LOADING" : "LOGIN"} */}
                        SUBMIT
                    </Button>

                    <Button
                    mode="outlined"
                    buttonColor="#296EB4"
                    textColor="#FDB833"
                    // onPress={handleSubmit(authenticationHandler)}
                    // loading={userLoading || roleLoading || institutionLoading}
                    // disabled={userLoading || roleLoading || institutionLoading}
                    labelStyle={{fontSize: 18, fontWeight: 'bold'}}
                    style={{padding: 6,borderRadius: 128}}>
                        {/* {userLoading || roleLoading || institutionLoading ? "LOADING" : "LOGIN"} */}
                        CANCEL
                    </Button>

                </View>

            </View>
        </ScrollView>
    )
}

export default EditProfile