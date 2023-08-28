import React, { useState } from 'react'
import {View, Modal, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { styles } from '../styles'
import { EventCard, SubjectCard } from './Cards'

enum SelectedSchedList {
    Subject = 'subject',
    Event = 'event'
}

const RoomInformation = ({showModal, roomTitle, onCardPress, onRequestClose}:any) => {

    const windowHeight = Dimensions.get('window').height

    const [selectedList, setSelectedList] = useState(SelectedSchedList.Subject)

    return(
        <Modal
        transparent={true}
        animationType='slide'
        onRequestClose={onRequestClose}
        visible={showModal}>
            <View style={[modalStyle.bottomSheet, {height: windowHeight * 0.6, gap: 8}]}>
                <View>
                    <Text variant='headlineLarge' style={{fontWeight: '700'}}>{roomTitle}</Text>
                    <Text variant='bodyLarge'>Managed By: <Text style={{fontWeight: '700'}}>Manager</Text></Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button
                    key="subject"
                    onPress={() => {setSelectedList(SelectedSchedList.Subject)}}
                    style={{flex: 1}}
                    mode={selectedList !== SelectedSchedList.Subject ? "text" : "contained"}>
                        Subject
                    </Button>

                    <Button
                    key="event"
                    onPress={() => {setSelectedList(SelectedSchedList.Event)}}
                    style={{flex: 1}}
                    mode={selectedList !== SelectedSchedList.Event ? "text" : "contained"}>
                        Event
                    </Button>
                </View>

                <ScrollView contentContainerStyle={{gap: 12}}>

                    {selectedList === SelectedSchedList.Subject && (
                        <SubjectCard onPress={onCardPress} title="Subject Title" edpCode="12345" schedule="7:30 am - 11:30 am" />
                    )}

                    {selectedList === SelectedSchedList.Event && (
                        <EventCard onPress={onCardPress} title='Event Title' date='January 12, 2023' schedule="7:30 am - 11:30 am" />
                    )}

                </ScrollView>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button buttonColor='#296EB4' style={{flex: 1}} onPress={() => {Alert.alert("Work in progress")}} mode="contained">NAVIGATE</Button>
                </View>
            </View>
        </Modal>
    )
}

const modalStyle = StyleSheet.create({
    headingText: {
        color: '#1F1F29'
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        backgroundColor: '#A2D0FE',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        zIndex: 1,
        bottom: 0,
    }
})

export {RoomInformation}