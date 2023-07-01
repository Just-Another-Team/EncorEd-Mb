import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList} from 'react-native-calendars'
import { HeaderCard } from '../../components/Cards'

const Event = () => {
    return(
        <ScrollView contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
            <Text style={{color: '#FDB833', fontSize: 32, fontWeight: '700', marginBottom: 8}}>Events</Text>
            
            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8, gap: 12}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700'}}>Upcoming Event</Text>
                
                <HeaderCard image={require('../../images/EventTestPic.png')}>
                    AHHHHHHHHHHHHHHHHHHHHH
                </HeaderCard>
                
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Location</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>Location</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Date/Time</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>10:00 AM - 11:00 AM</Text>
                </View>
                
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Organizer</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>University of Cebu - Banilad</Text>
                </View>
            </View>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 8}}>
                <Calendar style={{backgroundColor: '#F9F9FF'}}/>
            </View>

        </ScrollView>
    )
}

export default Event