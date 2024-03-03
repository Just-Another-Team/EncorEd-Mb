import React, { useEffect, useState, useMemo } from 'react'
import {Button, Pressable, View} from 'react-native'
import { FAB, Text } from 'react-native-paper'
import { Input } from '../../components/Inputs'
import { useForm } from 'react-hook-form'
import { RoomInformation } from '../../components/BottomBar'
import { CampusMap } from '../../components/MapComponent'
import { RoomLocation } from '../../types/componentProps'
import { navigate } from '../../routes/RootNavigation'
import DropDownPicker from 'react-native-dropdown-picker'
import { MapLevel } from '../../components/MapLevel/MapLevel'
import { centerToRoom } from '../../app/features/centerToRoom/centerToRoom'
import { useAppSelector } from '../../app/encored-redux-hooks'

// The SVG Map or Map sets goes here

const Map = () => {
    //const {control, handleSubmit} = useForm();
    const levelSelector = useAppSelector(state => state.level);

    //Dropdown Picker
    const [open, setOpen] = useState(false)
    const [floor, setFloor] = useState('G')

    //Modal
    const [showModal, setShowModal] = useState(false)

    //Selected Room Location
    const [clickInfo, setClickInfo] = useState<RoomLocation>({
        longitude: 0,
        latitude: 0,
        roomName: ''
    })

    const [lon, setLon] = useState(123.911976)
    const [lat, setLat] = useState(10.338519)
    const [zoom, setZoom] = useState(19.5)

    const handleCloseSelectedRoom = () => {
        setShowModal(false)
        
        setClickInfo({
            longitude: 0,
            latitude: 0,
            roomName: ''
        })
    }

    const cardPressHandler = () => {
        setShowModal(false)

        navigate('SelectedItem')
    }

    const selectRoomPress = (event: any) => {
        const room = event.features && event.features[0]


        console.log();
        // if (room === undefined) return;

        // setClickInfo({
        //     longitude: event.coordinates.longitude,
        //     latitude: event.coordinates.latitude,
        //     roomName: room.properties.room_name  
        // })

        // const {x, y} = centerToRoom(room.geometry.coordinates[0])

        // setLon(x)
        // setLat(y)
        // setZoom(20.25)

        // setShowModal(true)
    }

    const selectedRoom = (clickInfo && clickInfo.roomName) || ''
    const roomFilter = useMemo(() => ['in', 'room_name', selectedRoom], [selectedRoom])

    return(
        <View style={{flex: 1, backgroundColor: "#F30"}}>
            <MapLevel />

            <RoomInformation
            roomTitle={clickInfo.roomName}
            onCardPress={cardPressHandler}
            showModal={showModal}
            onRequestClose={handleCloseSelectedRoom}
            />

            <CampusMap
            onPress={selectRoomPress}
            zoom={zoom}
            floor={levelSelector.selectedLevel.levelKey.toLowerCase()}
            filter={roomFilter}
            centerCoordinate={[lon, lat]}/>
        </View>
    )
}

export default Map