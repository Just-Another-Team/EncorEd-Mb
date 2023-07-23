import React from 'react'
import {Alert, ScrollView, View} from 'react-native'
import { Chip, Text } from 'react-native-paper'
import { Input } from '../../components/Inputs'
import { useForm } from 'react-hook-form'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navigate } from '../../navigators/RootNavigation'
import { ImageCard } from '../../components/Cards'
import { EventImage, SubjectImage } from '../../types/images'
import { Calendar } from 'react-native-calendars'

const Dashboard = () => {
    const {control, handleSubmit} = useForm();

    return(
        <ScrollView contentContainerStyle={{paddingLeft: 20, paddingTop: 10, paddingBottom: 10, paddingRight: 20}}>
            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, marginBottom: 10, borderRadius: 8, padding: 16}}>
                <Text style={{color: '#FDB833', fontSize: 28, fontWeight: '700'}}>Welcome</Text>
                <Text style={{color: '#1789FC', fontSize: 32, fontWeight: '700'}}>Full name here</Text>
            </View>

            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, marginBottom: 10, borderRadius: 8, padding: 16, gap: 16}}>
                <Input
                name="searchRoom"
                control={control}
                label="Looking for a room?"
                onPressIn={() => {navigate('Map')}}/>

                <ScrollView horizontal contentContainerStyle={{gap: 12}}>
                    <Chip style={{backgroundColor: '#548BC3'}} textStyle={{color: '#A2D0FE'}}>Room 217</Chip>
                    <Chip style={{backgroundColor: '#548BC3'}} textStyle={{color: '#A2D0FE'}}>Room 218</Chip>
                </ScrollView>
            </View>

            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, marginBottom: 10, borderRadius: 8, padding: 16, gap: 12}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700',}}>Upcoming Events</Text>
                <ImageCard onPress={() => navigate("SelectedItem")} image={EventImage} />
            </View>

            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, marginBottom: 10, borderRadius: 8, padding: 16, gap: 12}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700',}}>Current Subject</Text>
                <ImageCard onPress={() => navigate("SelectedItem")} image={SubjectImage} />
            </View>

            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, marginBottom: 10, borderRadius: 8, padding: 16, gap: 12}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700',}}>Calendar</Text>
                <Calendar />
            </View>
        </ScrollView>
    )
}

export default Dashboard