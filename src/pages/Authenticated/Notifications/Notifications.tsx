import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { List, Text } from "react-native-paper"
import { FixMeLater } from "../../../types/FixMeLater"
import { IsValid } from "../../../types/IsValid"
import * as navigation from "../../../routes/RootNavigation"
import { useAppSelector } from "../../../app/encored-redux-hooks"
import { RoomReportType } from "../../../types/SelectedLevelType"
import IAttendance from "../../../types/IAttendance"
import dayjs from "dayjs"

export const Notifications = () => {
    const role = useAppSelector(state => state.role.data)
    const user = useAppSelector(state => state.authentication.user)
    const attendances = useAppSelector(state => state.attendance)

    return (
        <List.Section>
            {attendances.data
            .filter(((item: IAttendance) => role.teacher ? (item.status !== IsValid.pending && item.submitBy === user?.id) : item.status === IsValid.pending))
            .sort((item1: IAttendance, item2: IAttendance) => dayjs(role.teacher ? item2.verifyAt : item2.submitAt).toDate().getTime() - dayjs(role.teacher ? item1.verifyAt : item1.submitAt).toDate().getTime() )
            .map((item: IAttendance, ind: number) => (
                <List.Item
                key={ind}
                onPress={(e) => { 
                    navigation.navigate("Room", item);
                }}
                title={() => (
                    role.employee ? <Text variant='titleLarge'>{item.roomName}</Text> : <Text variant='titleMedium' style={item.status === IsValid.approve ? style.validText : style.invalidText}>{item.status === IsValid.approve ? `Attedance approved - ${item.roomName}` : `Attedance rejected - ${item.roomName}`}</Text>
                )}
                description={() => (
                    <View>
                        <Text>{`${role.employee ? "Submitted at " : ''}${dayjs(item.submitAt).format("HH:MM A - MMMM d, YYYY")}`}</Text>
                    </View>
                )}
                />
            ))}
        </List.Section>
    )
}

const style = StyleSheet.create({
    validText: { color: "#0DA400", fontWeight: '700'},
    pendingText: { color: "#C1AD00", fontWeight: '700' },
    invalidText: { color: "#C02807", fontWeight: '700' },
})

export default Notifications