import { GestureResponderEvent, View } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import RecentAttendanceCard from "../../components/CardRecentAttendance"
import { useAuth } from "../../hooks/useAuth"
import { useAttendances } from "../../hooks/useAttendances"
import ISubject from "../../types/ISubject"
import dayjs from "dayjs"
import { useNavigation } from "@react-navigation/native"
import Color from "../../assets/styles/Color"

const RecentAttendance = ({ styles }: FixMeLater) => {
    const { user } = useAuth()
    const { navigate } = useNavigation();
    const { load, getRecentAttendances } = useAttendances()

    const handleViewMore = (e: GestureResponderEvent) => {
        navigate("RecentAttendances");
    }

    const recentAttendances = getRecentAttendances(user?.uid as string)

    return (
        <View
        style={styles.contentContainer}>
            <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
            }}>
                <Text
                variant="titleLarge"
                style={{ flex: 1 }}>
                    Recent Attendances
                </Text>
                <View>
                    {/* Another page for all on going subjects */}
                    <Button
                    onPress={handleViewMore}>
                        View more
                    </Button>
                </View>
            </View>

            {/* Attendance Data */}
            <View
            style={{
                gap: 8,
                height: 186
            }}>
                {recentAttendances?.length != 0 ?
                recentAttendances?.map((el) => (
                    <RecentAttendanceCard
                    key={el.ATTD_ID}
                    title={(el.SUB_ID as ISubject).SUB_DESCRIPTION as string}
                    titleStyle={styles.cardTextStyle}
                    subTitle={dayjs(el.ATTD_SUBMISSIONDATE as string).format("hh:mm A - DD/MM/YYYY")}
                    subTitleStyle={[styles.cardTextStyle, {
                        fontStyle: 'italic',
                    }]}
                    style={[styles.cardStyle, {
                        padding: 8,
                        paddingVertical: 8,
                    }]}/>
                )) : <View
                style={{ 
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text
                    variant="bodySmall"
                    style={{
                        textAlign: 'center',
                        color: Color('black', 100)
                    }}>
                        You have not submitted an attendance for today.
                    </Text>
                </View>} 
                {/* If it is loading, progress bar */}
            </View>
        </View>
    )
}

export default RecentAttendance
