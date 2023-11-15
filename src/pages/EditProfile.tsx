import React from 'react'
import {ScrollView, View } from 'react-native'
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper'
import { TextInputProps } from '../types/input'
import { Input } from '../components/Inputs'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../app/encored-redux-hooks'
import { getUser, logIn, signIn, updateUser } from '../app/features/auth/authSlice'
import { navigate } from '../navigators/RootNavigation'
import { auth } from '../app/firebase/authentication'
import { getInstitution } from '../app/features/institution/institutionSlice'
import { getRole } from '../app/features/role/roleSlice'

const EditProfile = () => {

    const dispatch = useAppDispatch()



    const user = useAppSelector(state => state.authentication.user)

    const userLoading = useAppSelector(state => state.authentication.loading)
    const rolesLoading = useAppSelector(state => state.role.loading)
    const institutionLoading = useAppSelector(state => state.institution.loading)

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
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.id,
            userName: user?.userName,
            password: '',
            newPassword: '',
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
        {id: 'password', placeHolder: "Old Password", textContentType: "password", secureEntryText: true, formError: errors.password, rules: {required: "Password is required"}},
        {id: 'newPassword', placeHolder: "New Password", textContentType: "password", secureEntryText: true, formError: errors.newPassword},
        {id: 'confirmPassword', placeHolder: "Confirm New Password", textContentType: "password", secureEntryText: true, formError: errors.confirmPassword, }, 
    ]

    const handleEditProfile = (data: any) => {
        const {firstName, lastName, userName, email, password, newPassword} = data

        const input = {
            id: user?.id,
            firstName,
            lastName,
            userName,
            email,
            password,
            newPassword: data.newPassword?.trim().length !== 0 ? data.newPassword?.trim() : undefined
        }

        console.log("Edited Profile", input)

        dispatch(updateUser(input)).unwrap()
            .then(() => {
                dispatch(getUser(input.email)).unwrap()
                    .then((dbResult) => {
                        
                        console.log("Get User Result", dbResult.data)

                        let email = auth.currentUser?.email !== input.email ? input.email : auth.currentUser?.email
                        let password = input.newPassword != undefined ? input.newPassword : input.password

                        return dispatch(signIn({email: email, password: password})).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch((error) => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        //get Institution   
                        return dispatch(getInstitution(dbResult.data.institution)).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch(error => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        //get Roles
                        return dispatch(getRole(dbResult.data.id)).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch(error => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        console.log("Edit Profile Result", dbResult.data)
                        dispatch(logIn(dbResult.data))

                        navigate('Profile')
                        reset()
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.error("UPDATE ERROR OCCURED", error)
                //alert(`Error Occured:\n${error}`)
            })

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
            

            <View style={{zIndex: 1, padding: 16}}>

                <View style={{paddingVertical: 48}}>
                    <Text variant='displaySmall' style={{textAlign: 'center', fontWeight: '700'}}>Edit Profile</Text>
                </View>

                <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, marginBottom: 8}}>

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

                        //watch={watch}

                        rules={el.rules}
                        />
                    )}

                </View>

                <View style={{gap: 16}}>
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
                    // buttonColor="#296EB4"
                    // textColor="#FDB833"
                    // onPress={handleSubmit(authenticationHandler)}
                    // loading={userLoading || roleLoading || institutionLoading}
                    // disabled={userLoading || roleLoading || institutionLoading}
                    onPress={() => {
                        navigate('Profile')
                    }}
                    labelStyle={{fontSize: 18, fontWeight: 'bold'}}
                    style={{padding: 6,borderRadius: 128}}>
                        {/* {userLoading || roleLoading || institutionLoading ? "LOADING" : "LOGIN"} */}
                        CANCEL
                    </Button>
                </View>

                <Portal>
                    <Dialog visible={userLoading || rolesLoading || institutionLoading} dismissable={false}>
                        <Dialog.Title>Loading</Dialog.Title>
                        <Dialog.Content>
                            <View style={{display: 'flex', alignItems: 'center', gap: 12}}>
                                <ActivityIndicator size={'large'}/>
                                <Text variant="bodyMedium">Please wait while we pro</Text>
                            </View>
                        </Dialog.Content>
                        {/* <Dialog.Actions>
                            <Button>Done</Button>
                        </Dialog.Actions> */}
                    </Dialog>
                </Portal>

            </View>
        </ScrollView>
    )
}

export default EditProfile

function register(dbResult: any): any {
    throw new Error('Function not implemented.')
}
