import React, { useState } from 'react'
import {View, Modal, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { styles } from '../assets/styles/defaultStyle'
import { EventCard, SubjectCard } from './Cards'
import { useAppSelector } from '../app/encored-redux-hooks'

enum SelectedSchedList {
    Subject = 'subject',
    Event = 'event'
}

const RoomInformation = ({showModal, roomTitle, onCardPress, onRequestClose}: any) => {

    const windowHeight = Dimensions.get('window').height

    const user = useAppSelector(state => state.authentication.user)

    const [requesting, setRequesting] = useState(false)
    const [selectedList, setSelectedList] = useState(SelectedSchedList.Subject)

    const setRequestingHandler = () => {
        if (requesting === true) setRequesting(false)
        if (requesting === false) setRequesting(true)
    }

    return(
        <Modal
        transparent={true}
        animationType='slide'
        onRequestClose={onRequestClose}
        visible={showModal}>
            <View style={[modalStyle.bottomSheet, {display: 'flex', height: windowHeight * 0.6, gap: 8}]}>
                <View>
                    <Text variant='headlineLarge' style={{fontWeight: '700'}}>{roomTitle}</Text>
                    <Text variant='bodyLarge'>Managed By: <Text style={{fontWeight: '700'}}>Manager</Text></Text>
                </View>

                <View style={{display: requesting ? 'none' : 'flex', flex: 1, gap: 8}}>
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

                        {selectedList === SelectedSchedList.Subject && Array.from({length: 2}).map((el, ind) => (
                                <SubjectCard onPress={onCardPress} title="Subject Title" edpCode="12345" schedule="7:30 am - 11:30 am" />
                        ))}

                        {selectedList === SelectedSchedList.Event && (
                            <EventCard onPress={onCardPress} title='Event Title' date='January 12, 2023' schedule="7:30 am - 11:30 am" />
                        )}
                    </ScrollView>
                </View>

                <View style={{display: requesting ? 'flex' : 'none', flex: 1, gap: 8}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6}}>
                        <Text variant='bodyLarge' style={{flex: 0.4}}>Requested By:</Text>
                        <TextInput mode='outlined' disabled style={{flex: 0.6}} value={`${user?.firstName} ${user?.lastName}`}/>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6}}>
                        <Text variant='bodyLarge' style={{flex: 0.4}}>Schedule:</Text>
                        <TextInput mode='outlined' style={{flex: 0.6}}/>
                    </View>
                    
                    <View style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                        <Text variant='bodyLarge'>Description:</Text>
                        <TextInput mode='outlined'  multiline />
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', gap: 24, justifyContent: 'space-between'}}>
                    <Button buttonColor='#296EB4' style={{flex: 1}} onPress={() => {Alert.alert("Work in progress")}} mode="contained">NAVIGATE</Button>
                    <Button buttonColor='#296EB4' style={{flex: 1}} onPress={setRequestingHandler} mode="contained">REQUEST</Button>
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