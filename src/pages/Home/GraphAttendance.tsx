import { View } from "react-native"
import { Text } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { BarChart, barDataItem } from "react-native-gifted-charts"
import { useAttendances } from "../../hooks/useAttendances"
import { useAuth } from "../../hooks/useAuth"

const barData: Array<barDataItem> = [
    {
        value: 37.5,
        label: "Present"
    },
    {
        value: 42.5,
        label: "Late"
    },
    {
        value: 20,
        label: "Absent"
    },
]

const GraphAttendance = ({ styles }: FixMeLater) => {
    const { user } = useAuth()
    const { attendances, getAttendancesByReduction, getRecentAttendances, getAttendancesByCurrentDay } = useAttendances()

    const attendanceData = (): Array<barDataItem> => {
        const reducedAttendances = getAttendancesByReduction(getRecentAttendances(user?.uid as string))
        
        const presentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Present").length
        const earlyDismissalValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Early Dismissal").length
        const lateValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Late").length
        const absentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Absent").length

        return [
            { value: presentValue, label: 'Present' },
            { value: earlyDismissalValue, label: 'Early' },
            { value: lateValue, label: 'Late' },
            { value: absentValue, label: 'Absent' },
        ]
    }

    return (
        <View
        style={styles.contentContainer}>
            <Text
            variant="headlineSmall"
            style={{
                marginBottom: 16
            }}>
                Daily Report
            </Text>

            <View>
                <BarChart
                barWidth={36}
                initialSpacing={32}
                spacing={32}
                noOfSections={4}
                hideRules
                barBorderRadius={4}
                xAxisThickness={0}
                xAxisLabelTextStyle={{color: 'black'}}
                yAxisThickness={0}
                yAxisTextStyle={{color: 'black'}}
                maxValue={10}
                isAnimated
                data={attendanceData()}/>
            </View>
        </View>
    )
}

export default GraphAttendance