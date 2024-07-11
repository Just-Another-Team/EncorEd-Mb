import { useMemo } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MD3Theme, Text, useTheme } from "react-native-paper";
import Color from "../../assets/styles/Color";
import { useAttendances } from "../../hooks/useAttendances";
import { useAuth } from "../../hooks/useAuth";
import IRoom from "../../types/IRoom";
import IFloor from "../../types/IFloor";
import ISubject from "../../types/ISubject";
import IUser from "../../types/IUser";
import dayjs from "dayjs";
import IAttendance from "../../types/IAttendance";

type RecentAttendanceCardType = {
    key: React.Key | null | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style: any;
    attedanceValue: IAttendance
}

const RecentAttendanceCard = ({
    key,
    onPress,
    style,
    attedanceValue
}: RecentAttendanceCardType) => {

    return (
        <TouchableOpacity
        key={key}
        onPress={onPress}
        style={style.cardStyle}>
            <View
            style={style.cardContentContainer}>
                <Text variant="headlineSmall">
                    {(attedanceValue.SUB_ID as ISubject).SUB_DESCRIPTION}
                </Text>
                <Text variant="titleSmall">
                    {((attedanceValue.SUB_ID as ISubject).USER_ID as IUser).USER_FULLNAME}
                </Text>
                <Text variant="bodySmall" style={{ marginTop: 4 }}>
                    {dayjs(attedanceValue.ATTD_SUBMISSIONDATE as string).format("hh:mm A - DD/MM/YYYY")}
                </Text>
            </View>
            <View
            style={style.cardSubContentContainer}>
                <Text variant="bodyMedium" style={[style.cardSubContentTextStyle]}>
                    {(attedanceValue.ROOM_ID as IRoom).ROOM_NAME}
                </Text>
                <Text variant="bodySmall" style={[style.cardSubContentTextStyle, { marginTop: 4 }]}>
                    {((attedanceValue.ROOM_ID as IRoom).FLR_ID as IFloor).FLR_NAME}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Attendance = () => {
    const theme = useTheme()
    const { user } = useAuth()
    const { getRecentAttendances } = useAttendances()

    const handleOnPress = (attendance: IAttendance) => {

    }

    const style = useMemo(() => attendanceStyle(theme), [theme])

    return(
        <ScrollView
        contentContainerStyle={style.containerStyle}>
            
            {getRecentAttendances(user?.uid!)?.map((el) => (
                <RecentAttendanceCard
                attedanceValue={el}
                key={el.ATTD_ID}
                style={style}
                onPress={() => handleOnPress(el)}/>
            ))}

        </ScrollView>
    )
}

const attendanceStyle = (theme: MD3Theme) => StyleSheet.create({
    containerStyle: {
        padding: 12,
        gap: 12,
    },

    cardStyle: {
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 4,
        backgroundColor: Color('white', 100),
        shadowOffset: {
            width: 0,
            height: -1
        },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        shadowColor: Color("black", 400)
    },
    cardContentContainer: {
        flex: 1,
    },
    cardSubContentContainer: {
        justifyContent:'center',
        alignItems: 'flex-end',
    },
    cardSubContentTextStyle: {
        color: Color('black', 100),
        fontStyle: 'italic'
    }
})


export default Attendance