import React from 'react'
import { View, Image, ScrollView, Alert } from 'react-native'
import {Button, Text} from 'react-native-paper'
import { SubjectImage } from '../../types/images'
import { colors, styles } from '../../styles'
import { navigate } from '../../navigators/RootNavigation'

const SelectedItem = () => {
    return(
        <View style={{flexGrow: 1}}>
            <Image
            source={SubjectImage}
            style={{
                width: '100%',
                height: 256
            }} />
            
            <ScrollView contentContainerStyle={{padding: 24}}>
                <Text
                variant='headlineLarge'
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    marginBottom: 16,
                    color: colors('darkBlue', 400)
                }}>
                    INSERT SUBJECT/EVENT TITLE HERE
                </Text>

                <View style={{backgroundColor: '#F6F5FF', borderRadius: 8, padding: 16, marginTop: 10, marginBottom: 10, gap: 12}}>
                    <View>
                        <Text variant='bodyLarge' style={{fontWeight: '700'}}>Room</Text>
                        <Text variant='bodyLarge' style={{color: colors('darkBlue', 300)}}>217</Text>
                    </View>

                    <View>
                        <Text variant='bodyLarge' style={{fontWeight: '700'}}>Schedule</Text>
                        <Text variant='bodyLarge' style={{color: colors('darkBlue', 300)}}>10:00 AM - 11:00 AM (Friday)</Text>
                    </View>

                    <View>
                        <Text variant='bodyLarge' style={{fontWeight: '700'}}>Subject Code</Text>
                        <Text variant='bodyLarge' style={{color: colors('darkBlue', 300)}}>74595</Text>
                    </View>
                </View>

                
            </ScrollView>

            <View
            style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 24,
                paddingBottom: 24
            }}> 
                <Button
                mode='contained'
                elevation={4}
                onPress={() => navigate('Map')}
                style={{
                    width: 192,
                    height: 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors('darkBlue', 400),
                    borderRadius: 8
                }}>
                    <Text
                    variant='titleLarge'
                    style={{
                        fontWeight: '700',
                        color: '#FFF'
                    }}>
                        Go to Room
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default SelectedItem

