import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { Button, RadioButton, Text, TextInput } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../types/navigation"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import AttendanceDataType from "../../types/AttendanceDataType"
import { navigate } from "../../routes/RootNavigation"
import MainTextInput from "../../components/TextInput"
import MainRadioGroup from "../../components/RadioButton/MainRadioGroup"
import radioButtonData from "../../data/radioButtonData"
import teacherData from "../../data/teacherData"
import { useMemo } from "react"
import subjectData from "../../data/subjectData"
import roomData from "../../data/roomData"

interface DeepLinkProps extends NativeStackScreenProps<AuthStackParamList, 'LinkPage'> {}

const DeepLink: React.FC<DeepLinkProps> = ({ route }) => {
    const { params: { edpCode, roomNumber, instructor } } = route;

    const room = useMemo(() => roomData.find(room => room.roomNumber === roomNumber), [])
    const subject = useMemo(() => subjectData.find(subject => subject.edpCode === edpCode), [])
    const teacher = useMemo(() => teacherData.find(teacher => teacher.email === instructor), [])

    const {control, reset, handleSubmit, formState: {errors}, getValues,} = useForm<AttendanceDataType>({
        defaultValues: {
            roomNumber: room?.roomNumber,
            edpCode: subject?.edpCode,
            startSchedule: dayjs(subject?.startTime).format("hh:mm A"),
            endSchedule: dayjs(subject?.endTime).format("hh:mm A"),
            instructor: `${teacher?.firstName} ${teacher?.lastName}`,
            comments: null,
            status: null,
            dateScanned: dayjs().format("MMMM DD, YYYY - HH:mm A"),
            dateSubmitted: null,
        }
    });

    const submitAttendance = (attendanceData: AttendanceDataType) => {
        Alert.alert("Attendance Data Submitted", `Room Number: ${attendanceData.roomNumber}\nEDP Code: ${attendanceData.edpCode}\nSchedule: ${attendanceData.startSchedule} - ${attendanceData.endSchedule}\nInstructor: ${attendanceData.instructor}\nStatus: ${attendanceData.status}\nComments: ${attendanceData.comments}`)
        reset();
    }

    const cancelAttendance = () => {
        navigate("QR");
    }

    return(
        <ScrollView contentContainerStyle={{ flex: 1, gap: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
            {/* <View>
                <MainTextInput control={control} name="roomNumber" label="Room Number" />
            </View>

            <View>
                <MainTextInput control={control} name="edpCode" label="Subject EDP Code" />
            </View>

            <View>
                <Text>Subject Schedule</Text>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <MainTextInput fullWidth control={control} name="startSchedule" placeholder="HH:MM" />
                    <MainTextInput fullWidth control={control} name="endSchedule" placeholder="HH:MM" />
                </View>
            </View>

            <View>
                <MainTextInput control={control} name="instructor" label="Instructor assigned to subject schedule" />
            </View>

            <View>
                <MainTextInput control={control} name="comments" label="Comments" multiline numberOfLines={6}/>
            </View>

            <View style={{ marginVertical: 8 }}>
                <Text>Status of Instructor</Text>
                <MainRadioGroup control={control} name="status" items={radioButtonData}/>
            </View>

            <View>
                <Text variant="labelMedium">Date Scanned: {getValues('dateScanned') as string}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'flex-end', gap: 16}}>
                <Button onPress={handleSubmit(submitAttendance)} mode="contained" style={styles.buttonColumn}>Submit</Button>
                <Button onPress={cancelAttendance} mode="outlined" style={styles.buttonColumn}>Cancel</Button>
            </View> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonColumn: {
        flex: 1
    }
})

export default DeepLink