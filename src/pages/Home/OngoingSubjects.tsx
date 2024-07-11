import { GestureResponderEvent, View } from "react-native"
import { ActivityIndicator, Button, IconButton, Text } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { useSubject } from "../../hooks/useSubject"
import RecentAttendanceCard from "../../components/CardRecentAttendance"
import ISchedule from "../../types/ISchedule"
import dayjs, { Dayjs } from "dayjs"
import Color from "../../assets/styles/Color"
import { useNavigation } from "@react-navigation/native"
import useClock from "../../hooks/useClock"
import { OngoingSubjectData } from "../../data/subjectData"
import { useSchedules } from "../../hooks/useSchedules"
import ISubject from "../../types/ISubject"


const OngoingSubjects = ({ styles }: FixMeLater) => {
    const { ctime } = useClock()

    const { navigate } = useNavigation()
    const { load, subjects, getOngoingSubjects, getSubjectsBySchedule } = useSubject();
    const { getSchedule } = useSchedules()

    const handleViewMore = (e: GestureResponderEvent) => {
        navigate('OngoingSubjects')
    }

    //console.log(getSubjectsBySchedule(dayjs()))

    // subjects.map((subject) => {
    //     console.log(getSchedule(subject.SCHED_ID as string))
    // })

    const ongoingSubjects: Array<ISubject> = []//getOngoingSubjects(ctime?.toISOString()!)

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
                    Ongoing Subjects
                </Text>
                <View>
                    {/* Another page for all on going subjects */}
                    <Button
                    disabled
                    onPress={handleViewMore}>
                        View more
                    </Button>
                </View>
            </View>

            {/* Subject Data */}
            <View
            style={{ 
                gap: 8,
                height: 186
            }}>
                {ongoingSubjects.length != 0 ? 
                ongoingSubjects.map((el) => {
                    //console.log(el.SCHED_ID)
                    return (
                        <RecentAttendanceCard
                        key={el.SUB_ID}
                        title={el.SUB_DESCRIPTION !== null ? el.SUB_DESCRIPTION : ""}
                        titleStyle={styles.cardTextStyle}
                        subTitle={`${dayjs((el.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((el.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`}
                        subTitleStyle={[styles.cardTextStyle, {
                            fontStyle: 'italic',
                        }]}
                        style={[styles.cardStyle, {
                            padding: 8,
                            paddingVertical: 8,
                        }]}/>
                    )
                }) : load ? (
                    <View
                    style={{ 
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View
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
                            {`Ongoing Subjects Tag broke :(`}
                            {/* No ongoing subjects at this hour. */}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default OngoingSubjects
