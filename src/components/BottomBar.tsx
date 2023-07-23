import React from 'react'
import {Text, View, Modal, StyleSheet} from 'react-native'
import {  } from 'react-native-paper'

const RoomInformation = () => {
    
    return(
        <Modal
        transparent={true}
        animationType='slide'
        visible={false}>
            <View style={[styles.bottomSheet, {height: 360}]}>
                <Text>Hello Modal!</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        zIndex: 1,
        bottom: 64,
      }
})

export {RoomInformation}