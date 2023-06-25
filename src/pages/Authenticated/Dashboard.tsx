import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'

const Dashboard = () => {
    return(
        <ScrollView style={{padding: 16}}>
            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16}}>
                <Text style={{color: '#FDB833', fontSize: 56, fontWeight: '700', textAlign: 'center'}}>Welcome</Text>
                <Text style={{color: '#1789FC', fontSize: 56, fontWeight: '700', textAlign: 'center'}}>Full name here</Text>
            </View>
        </ScrollView>
    )
}

export default Dashboard