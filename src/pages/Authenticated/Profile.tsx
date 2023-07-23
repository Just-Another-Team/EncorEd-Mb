import React from 'react'
import {ScrollView, View, Alert} from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import { navigate } from '../../navigators/RootNavigation'

const Profile = () => {
    return(
        <ScrollView style={{padding: 0}}>
            <View style={{backgroundColor: '#A9C5E1', height: 256, zIndex: 0}}>
            </View>

            <View style={{padding: 16, zIndex: 1, marginTop: -176}}>
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
                    <Avatar.Image size={224} source={require('../../images/profilepic.png')} />
                    <Text style={{color: '#296EB4', fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 8}}>Full name</Text>
                
                    <Button mode='contained' onPress={() => navigate("Login")} style={{backgroundColor: '#EB002B'}}>LOGOUT</Button>
                </View>

                <View style={{gap: 16, backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8}}>
                    <Text style={{color: '#1F1F29', fontSize: 24, fontWeight: '700', marginBottom: 4}}>Details</Text>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Birth date:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>February 12, 1990</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Email:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>josegonzales420@gmail.com</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Joined In:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>December 21, 2022</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Affiliated Institution:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>University of Cebu - Banilad</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>User Type:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>Student</Text>
                    </View>

                    <View>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '700'}}>Course and Year:</Text>
                        <Text style={{color: '#1F1F29', fontSize: 18, fontWeight: '400'}}>BSIT - 1</Text>
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