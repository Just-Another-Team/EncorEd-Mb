import React, { useEffect, useState, useMemo } from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import { Portal, Text } from 'react-native-paper'
import { Input } from '../../components/Inputs'
import { useForm } from 'react-hook-form'
import { useNavigationState } from '@react-navigation/native'
import { RoomInformation } from '../../components/BottomBar'
import { CampusMap } from '../../components/MapComponent'
import { RoomLocation } from '../../types/componentProps'
import DropDownPicker from 'react-native-dropdown-picker'

// The SVG Map or Map sets goes here

const Map = () => {
    //const {control, handleSubmit} = useForm();

    const [showModal, setShowModal] = useState(false)

    const [clickInfo, setClickInfo] = useState<RoomLocation>()

    const handleCloseSelectedRoom = () => {
        setShowModal(false)
        setClickInfo({
            longitude: 0,
            latitude: 0,
            roomName: ''
        })
    }

    const [lon, setLon] = useState(123.911976)
    const [lat, setLat] = useState(10.338519)
    const [zoom, setZoom] = useState(19.5)

    const selectRoomPress = (event: any) => {
        const room = event.features && event.features[0]

        if (room === undefined) return;

        console.log(event);

        // setClickInfo({
        //     longitude: event.coordinates.longitude,
        //     latitude: event.coordinates.latitude,
        //     roomName: room.properties.Name  
        // })

        // const {x, y} = centerToRoom(room.geometry.coordinates[0])

        // setLon(x)
        // setLat(y)
        // setZoom(20.25)

        // setShowModal(true)
    }

    const centerToRoom = (coordinates:number[][]) => {
        var x = 0;
        var y = 0;

        var i:number = 0;
        for (; i < coordinates.length - 1; i++) {
            x += coordinates[i][0]
            y += coordinates[i][1]
        }

        return {x: x/(coordinates.length - 1), y: (y/(coordinates.length - 1)) - 0.0001}
    }

    const selectedRoom = (clickInfo && clickInfo.roomName) || ''
    const roomFilter = useMemo(() => ['in', 'Name', selectedRoom], [selectedRoom])

    const [open, setOpen] = useState(false)
    const [floor, setFloor] = useState('G')
    const [items, setItems] = useState([
        {value: 'B', label: "Basement"},
        {value: 'G', label: "Ground"},
        {value: 'M', label: "Mezzanine"},
        {value: '2', label: "2nd Floor"},
    ])

    return(
        <View style={{flex: 1}}>
            <View style={{position: 'absolute', right: 0, zIndex: 1, width: '50%', padding: 16}}>
                <View style={{backgroundColor: '#FEFEFE', borderRadius: 8, padding: 16}}>
                    <Text style={{color: '#296EB4', fontSize: 18, fontWeight: '700', }}>Floor</Text>
                    <DropDownPicker
                    open={open}
                    value={floor}
                    items={items}
                    setOpen={setOpen}
                    setValue={setFloor}
                    setItems={setItems}
                    />
                </View>
            </View>

            <RoomInformation
            showModal={showModal}
            onRequestClose={handleCloseSelectedRoom}
            />

            <CampusMap
            onPress={selectRoomPress}
            zoom={zoom}
            floor={floor}
            filter={roomFilter}
            centerCoordinate={[lon, lat]}
            />
        </View>
    )
}

export default Map