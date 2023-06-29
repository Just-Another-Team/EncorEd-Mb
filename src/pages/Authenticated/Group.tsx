import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'

const Group = () => {
    return(
        <ScrollView style={{padding: 16}}>
            <Text style={{color: '#FDB833', fontSize: 40, fontWeight: '700', marginBottom: 16}}>Groups</Text>
            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16}}>
                <Text style={{color: '#296EB4', fontSize: 24, fontWeight: '700', }}>WIP</Text>
            </View>
        </ScrollView>
    )
}

export default Group