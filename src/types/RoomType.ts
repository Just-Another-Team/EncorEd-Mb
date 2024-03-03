export type RoomType = {
    room_id?: number,
    room_level?: string,
    room_name?: string,
    room_sttus?: string,
    room_type?: string,
    featureCoordinates?: Array<Array<number>>;
}

export type RoomOptionType = {
    label: string;
} & RoomType