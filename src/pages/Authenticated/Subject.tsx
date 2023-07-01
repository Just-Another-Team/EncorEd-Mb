import React from 'react'
import {ScrollView, View} from 'react-native'
import { Text } from 'react-native-paper'
import { HeaderCard, ImageCard } from '../../components/Cards'

const Subject = () => {
    return(
        <ScrollView contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
            <Text style={{color: '#FDB833', fontSize: 32, fontWeight: '700', marginTop: 10, marginBottom: 10}}>Subjects</Text>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 10, marginBottom: 10, gap: 12}}>
                <Text variant='titleLarge' style={{color: '#296EB4', fontWeight: '700', }}>Current Subject</Text>
                <HeaderCard image={require('../../images/ImageTestPic.png')}>
                    AHHHHHHHHHHHHHHHHHHHHH
                </HeaderCard>
                
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Room</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>Room</Text>
                </View>


                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Schedule</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>10:00 AM - 11:00 AM</Text>
                </View>
                
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant='bodyLarge' style={{fontWeight: '700', flex: 1}}>Code</Text>
                    <Text variant='bodyLarge' style={{fontWeight: '700', color: '#548BC3', flex: 2}}>74595</Text>
                </View>
                
            </View>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16, marginTop: 10, marginBottom: 10, gap: 12}}>
                <Text style={{color: '#296EB4', fontSize: 20, fontWeight: '700', }}>Subjects</Text>
                
                <ScrollView horizontal contentContainerStyle={{gap: 12, flexGrow: 1, flexWrap: 'nowrap'}}>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                    <ImageCard>Image</ImageCard>
                </ScrollView>

            </View>


        </ScrollView>
    )
}

export default Subject