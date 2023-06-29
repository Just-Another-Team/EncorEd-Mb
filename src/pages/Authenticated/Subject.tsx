import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'

const Subject = () => {
    return(
        <ScrollView style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
            <Text style={{color: '#FDB833', fontSize: 32, fontWeight: '700', marginTop: 10, marginBottom: 10}}>Subjects</Text>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 10, marginBottom: 10}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700', }}>Current Subject</Text>
            </View>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 10, marginBottom: 10}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700', }}>Subjects</Text>
            </View>


        </ScrollView>
    )
}

export default Subject