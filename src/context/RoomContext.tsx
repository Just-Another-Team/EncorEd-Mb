import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
import IRoom from "../types/IRoom";
import IFloor from "../types/IFloor";
import { RoomType } from "../types/RoomType";
import { useSchedules } from "../hooks/useSchedules";

type RoomContextType = {
    rooms: Array<IRoom>;
    floors: Array<IFloor>

    getRooms: () => Array<IRoom>
    getClassrooms: () => Array<IRoom>
    getOffices: () => Array<IRoom>

    getRoom: (roomId: string) => IRoom | undefined
    getRoomFloor: (floorId: string) => IFloor | undefined
    getFloorSortedByLevel: () => Array<IFloor>
    load: boolean;
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

type RoomProviderType = {
    children: React.ReactNode;
}

export const RoomProvider = ({
    children
}: RoomProviderType) => {
    const { user } = useAuth()
    const { getSchedule } = useSchedules()

    const [floors, setFloors] = useState<Array<IFloor>>([]);
    const [rooms, setRooms] = useState<Array<IRoom>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const floorCollection = collection(db, '/Floor/').withConverter(converter<IFloor>())
    const roomCollection = collection(db, '/Room/').withConverter(converter<IRoom>())

    const getFloorSortedByLevel = () => {
        return floors.sort((floor, nextFloor) => floor.FLR_LEVEL > nextFloor.FLR_LEVEL ? -1 : 1)
    }

    const getRoomFloor = (floorId: string) => {
        return floors.find(floor => floor.FLR_ID === floorId)
    }

    const getRoom = (roomId: string): IRoom | undefined => {
        const selectedRoom = rooms.find(room => room.ROOM_ID === roomId);

        const floor = floors.find(floor => floor.FLR_ID === selectedRoom?.FLR_ID)
        const schedule = getSchedule(selectedRoom?.SCHED_ID as string) 

        return selectedRoom ? ({
            ...selectedRoom,
            FLR_ID: floor ? floor : null,
            SCHED_ID: schedule ? schedule : null,
        }) : undefined
    }

    const getRooms = () => {
        return rooms.filter(room => !room.ROOM_ISDELETED).map((room):IRoom => {
            const floor = floors.find(floor => floor.FLR_ID === room.FLR_ID)
            const schedule = getSchedule(room.SCHED_ID as string) 

            return ({
                ...room,
                SCHED_ID: schedule ? schedule : null,
                FLR_ID: floor ? floor : null
            })
        })
    }

    const getClassrooms = () => {
        return getRooms().filter(room => room.ROOM_TYPE === RoomType.classroom)
    }

    const getOffices = () => {
        return getRooms().filter(room => room.ROOM_TYPE === RoomType.office)
    }

    useEffect(() => {
        const fetchFloorSnapshots = onSnapshot(floorCollection, (snapshot) => {
            const floorDocs = snapshot.docs.map((floor):IFloor => {
                return({
                    ...floor.data(),
                    FLR_ID: floor.id,
                })
            })

            setFloors(floorDocs)
        }, (error) => {
            console.error('Floor Context Error', error)
        })

        const fetchRoomSnapshots = onSnapshot(roomCollection, (snapshot) => {
            const roomDocs = snapshot.docs.map((room):IRoom => {
                return({
                    ...room.data(),
                    ROOM_ID: room.id,
                })
            })

            setRooms(roomDocs)
        }, (error) => {
            console.error('Floor Context Error', error)
        })

        return () => {
            //Snapshots
            fetchFloorSnapshots()
            fetchRoomSnapshots()
            setLoad(false)
        }
    }, [user])

    const value = {
        rooms,
        floors,
        getRoom,
        getRooms,
        getRoomFloor,
        getFloorSortedByLevel,
        getClassrooms,
        getOffices,
        load,
        setLoad,
    }

    return (
        <RoomContext.Provider value={value}>
            { children }
        </RoomContext.Provider>
    )
}