import React from 'react'
import {Text, View, Modal, StyleSheet, Dimensions, ScrollView} from 'react-native'
import { Button } from 'react-native-paper'
import { styles } from '../styles'

const RoomInformation = ({showModal, onRequestClose}:any) => {

    const windowHeight = Dimensions.get('window').height

    return(
        <Modal
        transparent={true}
        animationType='slide'
        onRequestClose={onRequestClose}
        visible={showModal}>
            <View style={[modalStyle.bottomSheet, {height: windowHeight * 0.6, gap: 8}]}>
                <View>
                    <Text style={[styles.h1, modalStyle.headingText]}>ROOM TITLE</Text>
                    <Text style={{color: "#000000"}}>Managed By: <Text>Manager</Text></Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button style={{flex: 1}} mode="contained">Subject</Button>
                    <Button style={{flex: 1}} mode="outlined">Event</Button>
                </View>

                <ScrollView contentContainerStyle={{gap: 12}}>

                    {Array.from({length: 7}).map(el => (
                        <View style={{backgroundColor: "#FAFAFA", padding: 16, gap: 8, borderRadius: 8}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <Text style={{color: '#000000', fontSize: 16, fontWeight: '700'}}>SUBJECT TITLE</Text>
                                <Text style={{color: '#000000', fontSize: 16}}>EDP Code</Text>
                            </View>
                            <Text style={{color: '#000000', fontSize: 16}}>00:00am - 00:00pm</Text>
                        </View>
                    ))}

                </ScrollView>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button style={{flex: 1}} mode="contained">NAVIGATE</Button>
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