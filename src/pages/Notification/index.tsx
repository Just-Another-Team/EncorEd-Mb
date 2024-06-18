import { useMemo } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MD3Theme, Text, useTheme } from "react-native-paper";
import Color from "../../assets/styles/Color";
import IRoom from "../../types/IRoom";
import IFloor from "../../types/IFloor";
import ISubject from "../../types/ISubject";
import IUser from "../../types/IUser";
import dayjs from "dayjs";
import ISchedule from "../../types/ISchedule";

type SubjectCardType = {
    key: React.Key | null | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style: any;
    subjectValue: ISubject
}

const NotificationCard = ({
    key,
    onPress,
    style,
    subjectValue
}: SubjectCardType) => {

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
                    {`${dayjs((subjectValue.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((subjectValue.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`}
                </Text>
            </View>
            <View
            style={style.cardSubContentContainer}>
                <Text variant="bodyMedium" style={[style.cardSubContentTextStyle]}>
                    {(subjectValue.ROOM_ID as IRoom).ROOM_NAME}
                </Text>
                <Text variant="bodySmall" style={[style.cardSubContentTextStyle, { marginTop: 4 }]}>
                    {((subjectValue.ROOM_ID as IRoom).FLR_ID as IFloor).FLR_NAME}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Notifications = () => {
    const theme = useTheme()

    const handleOnPress = (subject: ISubject) => {
        //Navigate to wherever this notification goes. Subject, QR, or what
        console.log(subject)
    }

    const style = useMemo(() => notificationStyle(theme), [theme])

    return(
        <ScrollView
        contentContainerStyle={style.containerStyle}>
            
            {/* Notification Cards here */}

        </ScrollView>
    )
}

const notificationStyle = (theme: MD3Theme) => StyleSheet.create({
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


export default Notifications