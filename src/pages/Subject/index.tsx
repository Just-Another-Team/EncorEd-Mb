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
import dayjs, { Dayjs } from "dayjs";
import IAttendance from "../../types/IAttendance";
import { useSubject } from "../../hooks/useSubject";
import ISchedule from "../../types/ISchedule";
import useClock from "../../hooks/useClock";
import { OngoingSubjectData } from "../../data/subjectData";
import { useRooms } from "../../hooks/useRooms";
import { useSchedules } from "../../hooks/useSchedules";

type SubjectCardType = {
    key: React.Key | null | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style: any;
    subjectValue: ISubject
}

const RecentSubjectCard = ({
    key,
    onPress,
    style,
    subjectValue
}: SubjectCardType) => {
    const { getRoom } = useRooms()
    const { getSchedule } = useSchedules()

    return (
        <TouchableOpacity
        key={key}
        onPress={onPress}
        style={style.cardStyle}>
            <View
            style={style.cardContentContainer}>
                <Text variant="headlineSmall">
                    {subjectValue.SUB_DESCRIPTION}
                </Text>
                <Text variant="titleSmall">
                    {(subjectValue.USER_ID as IUser).USER_FULLNAME}
                </Text>
                <Text variant="bodySmall" style={{ marginTop: 4 }}>
                    {`${dayjs(getSchedule(subjectValue.SCHED_ID as string)?.SCHED_STARTTIME).format("hh:mm A")} - ${dayjs(getSchedule(subjectValue.SCHED_ID as string)?.SCHED_ENDTIME).format("hh:mm A")}`}
                </Text>
            </View>
            <View
            style={style.cardSubContentContainer}>
                <Text variant="bodyMedium" style={[style.cardSubContentTextStyle]}>
                    {getRoom(subjectValue.ROOM_ID as string)?.ROOM_NAME}
                </Text>
                <Text variant="bodySmall" style={[style.cardSubContentTextStyle, { marginTop: 4 }]}>
                    {(getRoom(subjectValue.ROOM_ID as string)?.FLR_ID as IFloor).FLR_NAME}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Subject = () => {
    const { ctime } = useClock()

    const theme = useTheme()
    const { getSubjectsBySchedule } = useSubject()

    const handleOnPress = (subject: ISubject) => {
        //Navigate to Selected Attendance
        console.log(subject)
    }

    const style = useMemo(() => subjectStyle(theme), [theme])

    const subjects = getSubjectsBySchedule(ctime as Dayjs)

    return(
        <ScrollView
        contentContainerStyle={style.containerStyle}>
            
            {subjects?.map((el) => (
                <RecentSubjectCard
                subjectValue={el}
                key={el.SUB_ID}
                style={style}
                onPress={() => handleOnPress(el)}/>
            ))}

        </ScrollView>
    )
}

const subjectStyle = (theme: MD3Theme) => StyleSheet.create({
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


export default Subject