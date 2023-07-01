import React, { useEffect } from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'
import { Input } from '../../components/Inputs'
import { useForm } from 'react-hook-form'
import {useNavigationState} from '@react-navigation/native'

// The SVG Map or Map sets goes here

const Map = () => {
    const {control, handleSubmit} = useForm();

    return(
        <View style={{flex: 1, padding: 16}}>
            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16}}>
                <Text style={{color: '#296EB4', fontSize: 24, fontWeight: '700', }}>Room</Text>
                <Input name='searchRoom' control={control} />
                
                <Text style={{color: '#296EB4', fontSize: 24, fontWeight: '700', }}>Floor</Text>
                <Input name='searchFloor' control={control} />
            </View>
        </View>
    )
}

export default Map