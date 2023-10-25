import React from 'react'
import {ScrollView, View, Alert, GestureResponderEvent} from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import { navigate } from '../../navigators/RootNavigation'
import { useDispatch, useSelector } from 'react-redux'
import * as navigation from '../../navigators/RootNavigation'
import { logOutUser } from '../../app/features/auth/authSlice'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '../../app/encored-redux-hooks'
import { logOutRole } from '../../app/features/role/roleSlice'
import { logOutInsitution } from '../../app/features/institution/institutionSlice'

const Profile = () => {
    const user = useAppSelector(state => state.authentication.user)
    const institution = useAppSelector(state => state.institution.data)
    const roles = useAppSelector(state => state.role.data)

    const signOutDispatch = useAppDispatch();

    const handleSignOut = (e: GestureResponderEvent) => {
        signOutDispatch(logOutUser()).unwrap()
            .then(() => {
                signOutDispatch(logOutRole())
                signOutDispatch(logOutInsitution())
                navigate("Login")
            })
            .catch((error) => {
                console.log({page: "Profile", type: "Logout", message: error.message})
            })
    }

    return(
        <ScrollView style={{padding: 0}}>
            <View style={{backgroundColor: '#A9C5E1', height: 256, zIndex: 0}}>
            </View>

            <View style={{marginTop: -160, padding: 16, zIndex: 1}}>
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
                    <Avatar.Image size={224} source={require('../../images/profilepic.png')} />
                    <Text style={{color: '#296EB4', fontSize: 32, fontWeight: '700', textAlign: 'center'}}>{`${user?.firstName} ${user?.lastName}`}</Text>
                
                    <Button
                    mode='contained'
                    onPress={handleSignOut}
                    style={{backgroundColor: '#EB002B'}}>
                        LOGOUT
                    </Button>
                </View>

                <View style={{gap: 16, backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 24, marginBottom: 8}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, color: '#1F1F29', fontSize: 28, fontWeight: '700', marginBottom: 4}}>Details</Text>
                        <Button mode='outlined' compact={true} onPress={() => {navigation.navigate('EditProfile')}}>Edit</Button>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Email:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>{user && user.id}</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Joined In:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>{dayjs(user?.joinDate).format("MMMM D, YYYY")}</Text>
                    </View>

                    {institution?.id !== "null"  && (
                        <View>
                            <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Affiliated Institution:</Text>
                            <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>{institution?.name}</Text>
                        </View>
                    )}

                    
                    {/* Make a type out of these objects */}
                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Role/s Assigned:</Text>
                        {roles?.map((role, ind) => (
                            <Text key={ind} style={{color: '#1F1F29', fontSize: 18,}}>{`${role._institutionalRole._name.charAt(0).toUpperCase()}${role._institutionalRole._name.slice(1)}`}</Text>
                        ))}
                    </View>
                </View>

                <View style={{gap: 16, backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8}}>
                    <Text style={{color: '#1F1F29', fontSize: 24, fontWeight: '700', marginBottom: 4}}>Navigation History</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Profile