import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, View, StyleSheet, GestureResponderEvent, ToastAndroid, Image } from 'react-native'
import { Avatar, Button, MD3Theme, Text, TextInput, useTheme } from 'react-native-paper'
import { AuthStackParamList } from '../../types/navigation'
import ModalLoading from '../../components/ModalLoading'
import { useEffect, useMemo, useState } from 'react'
import { useSchedules } from '../../hooks/useSchedules'
import { useUsers } from '../../hooks/useUsers'
import { useSubject } from '../../hooks/useSubject'
import { useRooms } from '../../hooks/useRooms'
import Color from '../../assets/styles/Color'
import { InitialStatus } from '../../data/AttendanceStatus'
import defaultProfilePic from '../../assets/images/profilepic.png'
import dayjs from 'dayjs'
import ISchedule from '../../types/ISchedule'
import { FirebaseError } from 'firebase/app'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../app/firebase/config'
import IAttendance from '../../types/IAttendance'
import attendanceService from '../../app/api/attendance-service'
import { navigate } from '../../routes/RootNavigation'
import IUser from '../../types/IUser'

const AttendanceReceipt:React.FC<NativeStackScreenProps<AuthStackParamList, 'AttendanceReceipt'>> = ({ route }) => {
    const { params } = route

    const { getRoom } = useRooms()
    const { getUser } = useUsers()
    const { getSubjects } = useSubject()

    const [loading, setLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("")

    const theme = useTheme();

    const attendance = params

    const submitAttendance = async (e: GestureResponderEvent) => {
        const attendanceData: IAttendance = {
            SUB_ID: attendance.SUB_ID,
            ROOM_ID: attendance.ROOM_ID,
            USER_ID: attendance.USER_ID,
            ATTD_TEACHERSTATUS: attendance.ATTD_TEACHERSTATUS,
            ATTD_COMMENT: comment !== "" ? comment : null
        }

        // console.log(attendanceData)

        // setLoading(true)

        // const input: IAttendance = {
        //     ROOM_ID: (params.ROOM_ID as IRoom).ROOM_ID as string,
        //     SUB_ID: (params.SUB_ID as ISubject).SUB_ID!,
        //     USER_ID: params.USER_ID,
        //     ATTD_SCANDATE: params.ATTD_SCANDATE,
        //     ATTD_SUBMISSIONDATE: dayjs().toISOString(),
        //     ATTD_TEACHERSTATUS: params.ATTD_TEACHERSTATUS,
            
        //     ATTD_COMMENT: params.ATTD_COMMENT,
        //     ATTD_STATUS: null,
        // }

        await attendanceService.addAttendance(attendanceData)
            .then(() => {
                console.log("Attendance added successfully!")
                ToastAndroid.show('Attendance submitted successfully!', ToastAndroid.SHORT)
                navigate("Dashboard")
            })
            .catch((error) => {
                console.error(error)
            })

        setLoading(false);
    }

    const user = getUser(attendance.USER_ID as string)
    const room = getRoom(attendance.ROOM_ID as string)
    const subject = getSubjects().find(subject => subject.SUB_ID === attendance.SUB_ID)
    const attendanceStatus = attendance.ATTD_TEACHERSTATUS === InitialStatus.present ? "Present" : "Not in the Room"

    const styles = useMemo(() => attendanceStyle(theme), [theme])

    return(
        <ScrollView
        contentContainerStyle={styles.containerStyle}>

            <View
            style={{
                padding: 8,
                marginBottom: 8,
                gap: 2
            }}>
                <TextInput 
                label="Comments"
                mode='outlined'
                multiline={true}
                numberOfLines={6}
                value={comment}
                onChangeText={text => setComment(text)}/>
                <Text
                variant='bodySmall'
                style={{
                    color: Color('black', 100),
                }}>
                    Optional comments about the attendance.
                </Text>
            </View>

            <View
            style={{
                backgroundColor: '#F0f0f0',
                marginHorizontal: 8,
                padding: 8,
                paddingVertical: 12,
                borderRadius: 8
            }}>
                    <View
                    style={{ 
                        marginBottom: 16
                    }}>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            Room:
                        </Text>
                        {/* <Text variant='titleLarge'>{(params.SUB_ID as ISubject).SUB_DESCRIPTION}</Text> */}
                        <Text
                        variant='titleLarge'>
                            { room?.ROOM_NAME }
                            {/* { subject?.SUB_DESCRIPTION } */}
                        </Text>
                    </View>

                    <View
                    style={{ 
                        marginBottom: 16
                    }}>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            Instructor:
                        </Text>
                        <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            marginTop: 4
                        }}>
                        <Avatar.Image
                        size={56}
                        source={{ uri: attendance.USER_PROFILE! }} />
                        <Text
                        variant='titleLarge'>
                            { subject?.USER_ID !== null ? (subject?.USER_ID as IUser).USER_FULLNAME : "No Instructor" }
                        </Text>
                        </View>
                    </View>

                    <View
                    style={{ 
                        marginBottom: 16
                    }}>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            EDP and Course Code:
                        </Text>
                        <Text
                        variant='titleLarge'>
                            {`${subject?.SUB_EDP_CODE} ${subject?.SUB_CODE}`}
                        </Text>
                    </View>

                    <View
                    style={{ 
                        marginBottom: 16
                    }}>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            Subject:
                        </Text>
                        <Text
                        variant='titleLarge'>
                            { subject?.SUB_DESCRIPTION }
                        </Text>
                    </View>

                    <View
                    style={{ 
                        marginBottom: 16
                    }}>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            Schedule:
                        </Text>
                        <Text
                        variant='titleLarge'>
                            {`${dayjs((subject?.SCHED_ID as ISchedule).SCHED_STARTTIME).format('hh:mm A')} - ${dayjs((subject?.SCHED_ID as ISchedule).SCHED_ENDTIME).format('hh:mm A')} (MWF)`}
                        </Text>
                    </View>

                    <View>
                        <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: 700,
                        }}>
                            Status:
                        </Text>
                        <Text
                        variant='titleLarge'
                        style={{
                            color: Color('darkBlue', 400),
                            fontWeight: 700,
                        }}>
                            { attendanceStatus }
                        </Text>
                    </View>
            </View>

            <View
            style={styles.bottomContainer}>
                <View
                style={styles.buttonContainer}>
                    <Button
                    mode="contained"
                    style={styles.buttonContainerChildren}
                    onPress={submitAttendance}>
                        Submit
                    </Button>
                </View>
            </View>

            <ModalLoading
            visible={loading}/>

            {/* <ModalComponent
            visible={false}>
                <ModalComponent.Header>
                    <Text variant='titleSmall'>Attendance added successfully!</Text>
                </ModalComponent.Header>
            </ModalComponent> */}
        </ScrollView>
    )
}

const attendanceStyle = (theme: MD3Theme) => StyleSheet.create({
    containerStyle: {
        padding: 8,
        flex: 1
    },
    flexRowContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    flexRowContainerChild: {
        flex: 1
    },
    radioContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        // alignItems: 'flex-end',
        gap: 8,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    buttonContainerChildren: {
        flex: 1
    }
})


export default AttendanceReceipt