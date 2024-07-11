import { Image, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Avatar, Button, MD3Theme, Text, useTheme } from "react-native-paper";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import ModalLoading from "../../components/ModalLoading";
import IAttendance from "../../types/IAttendance";
import IUser from "../../types/IUser";
import { useRooms } from "../../hooks/useRooms";
import { useSubject } from "../../hooks/useSubject";
import { useUsers } from "../../hooks/useUsers";
import Week from "../../components/Week";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase/config";
import ISchedule from "../../types/ISchedule";
import defaultProfilePic from '../../assets/images/profilepic.png'
import { FirebaseError } from "firebase/app";
import { InitialStatus } from "../../data/AttendanceStatus";

const AttendanceForm: React.FC<NativeStackScreenProps<AuthStackParamList, 'AttendanceForm'>> = ({ route, navigation }) => {
    const { params } = route

    const { getCurrentUser, getUser } = useUsers()
    const { rooms, load: RoomLoad } = useRooms()
    const { getSubjectsByCurrentTime, load: SubjectLoad } = useSubject()
    const { getRoom } = useRooms()

    const theme = useTheme()

    const [loading, setLoading] = useState<boolean>(false);
    const [profilePic, setProfilePic] = useState<string>(Image.resolveAssetSource(defaultProfilePic).uri);

    const subject = getSubjectsByCurrentTime().find(subject => subject.ROOM_ID === params.roomId)
    const subjectSchedule = subject?.SCHED_ID as ISchedule
    const user = subject?.USER_ID
    const room = getRoom(params.roomId)

    const getProfilePic = async () => {
        try {
            const image = await getDownloadURL(ref(storage, `${(subject?.USER_ID as IUser).USER_ID}.jpg`)) //(subject?.USER_ID as IUser).USER_ID

            setProfilePic(image)
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log({
                    message: error.message,
                    code: error.code,
                })
            }
        }
    }

    const submitAttendance = (attendanceStatus: InitialStatus) => {
        const attendanceData: IAttendance = {
            SUB_ID: subject?.SUB_ID!,
            ROOM_ID: room?.ROOM_ID!,
            USER_ID: getCurrentUser()?.USER_ID!,
            ATTD_TEACHERSTATUS: attendanceStatus,
            USER_PROFILE: profilePic
        }
        //Go to AttendanceReceipt with comment
        navigation.navigate('AttendanceReceipt', attendanceData)
    }

    useEffect(() => {
        getProfilePic()
    }, [])
    
    const styles = useMemo(() => attendanceStyle(theme), [theme])

    return(
        <ScrollView
        contentContainerStyle={styles.containerStyle}>
            <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 8
            }}>
                <View
                style={{
                    borderRadius: 256,
                }}>
                    <Avatar.Image
                    size={160}
                    source={{ uri: profilePic }}/>
                </View>
            </View>

            <View
            style={{
                marginBottom: 8
            }}>
                <Text
                variant='headlineMedium'
                style={{ 
                    textAlign: 'center',
                    fontWeight: 700,
                }}>
                    {user !== null ? (user as IUser).USER_FULLNAME : `No Instructor`}
                </Text>
            </View>

            <View
            style={{
                backgroundColor: '#F0f0f0',
                marginHorizontal: 8,
                padding: 8,
                paddingVertical: 12,
                borderRadius: 8,
                marginBottom: 32,
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
                        EDP and Course Code:
                    </Text>
                    <Text
                    variant='titleLarge'>
                        { `${subject?.SUB_EDP_CODE} ${subject?.SUB_CODE}` }
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
                    marginBottom: 8
                }}>
                    <Text
                    variant='titleSmall'
                    style={{ 
                        fontWeight: 700
                    }}>
                        Schedule:
                    </Text>
                    <Text
                    variant='titleLarge'>
                        {`${dayjs(subjectSchedule?.SCHED_STARTTIME).format('hh:mm A')} - ${dayjs(subjectSchedule?.SCHED_ENDTIME).format('hh:mm A')}`}
                    </Text>
                </View>

                <Week
                selectedWeeks={subjectSchedule.SCHED_WEEKASSIGNED}/>
            </View>

            <View>
                <Text
                variant='titleLarge'
                style={{
                    textAlign: 'center'
                }}>
                    {user !== null ? `Is instructor ${(user as IUser).USER_FULLNAME} in ${room?.ROOM_NAME}?` : `There is no instructor assigned to ${subject?.SUB_DESCRIPTION}`}
                </Text>
            </View>

            <View
            style={styles.bottomContainer}>                
                <View
                style={styles.buttonContainer}>
                    { user !== null ? (
                        <>
                        <Button
                        mode="contained"
                        style={styles.buttonContainerChildren}
                        onPress={() => {
                            submitAttendance(InitialStatus.present)
                        }}>
                            Yes
                        </Button>
                        <Button
                        mode="outlined"
                        style={styles.buttonContainerChildren}
                        onPress={() => {
                            submitAttendance(InitialStatus.notInRoom)
                        }}>
                            No
                        </Button>
                        </>
                    ) : (
                        <Button
                        mode="contained"
                        style={styles.buttonContainerChildren}
                        onPress={() => {
                            submitAttendance(InitialStatus.notInRoom)
                        }}>
                            Submit
                        </Button>
                    )}
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

export default AttendanceForm