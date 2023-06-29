import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList} from 'react-native-calendars'

const Event = () => {
    return(
        <ScrollView style={{padding: 16}}>
            <Text style={{color: '#FDB833', fontSize: 32, fontWeight: '700', marginBottom: 8}}>Events</Text>
            
            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700'}}>Upcoming Event</Text>
            </View>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8}}>
                <Calendar style={{backgroundColor: '#F9F9FF'}}/>
            </View>

        </ScrollView>
    )
}

export default Event