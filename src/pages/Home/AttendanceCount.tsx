import { View } from "react-native"
import { Text } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { useAttendances } from "../../hooks/useAttendances"
import { useAuth } from "../../hooks/useAuth"

const AttendanceCount = ({ styles }: FixMeLater) => {
    const { user } = useAuth()
    const { attendances, getRecentAttendances, getAttendancesByReduction, getAttendancesByCurrentDay } = useAttendances()

    const currentAttendances = getAttendancesByReduction(getRecentAttendances(user?.uid as string))

    return (
        <View
        style={[{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8
        }]}>
            <View
            style={[styles.contentContainer, { flex: 1, alignItems: "center" }]}>
                <Text
                variant="titleLarge">
                    { currentAttendances.filter(attendance => attendance.ATTD_TEACHERSTATUS === "Present").length }
                </Text>
                <Text
                variant="bodyLarge">
                    Present
                </Text>
            </View>
            <View
            style={[styles.contentContainer, { flex: 1, alignItems: "center" }]}>
                <Text
                variant="titleLarge">
                    { currentAttendances.filter(attendance => attendance.ATTD_TEACHERSTATUS === "Late").length }
                </Text>
                <Text
                variant="bodyLarge">
                    Late
                </Text>
            </View>
            <View
            style={[styles.contentContainer, { flex: 1, alignItems: "center" }]}>
                <Text
                variant="titleLarge">
                    { currentAttendances.filter(attendance => attendance.ATTD_TEACHERSTATUS === "Absent").length }
                </Text>
                <Text
                variant="bodyLarge">
                    Absent
                </Text>
            </View>
        </View>
    )
}

export default AttendanceCount