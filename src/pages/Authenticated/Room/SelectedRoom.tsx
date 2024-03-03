import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { FixMeLater } from "../../../types/FixMeLater"
import { useAppDispatch, useAppSelector } from "../../../app/encored-redux-hooks"
import { ScrollView } from "react-native-gesture-handler"
import { RoomReportType } from "../../../types/SelectedLevelType"
import { IsValid } from "../../../types/IsValid"
import ModalForm from "../../../components/Modal/ModalForm"
import { useState } from "react"
import ModalMessage from "../../../components/ModalMessage"
import IAttendance from "../../../types/IAttendance"
import dayjs from "dayjs"
import { getAttendances, validateAttendance } from "../../../app/features/attendance/attendanceSlice"
import { navigate } from "../../../routes/RootNavigation"

export const SelectedRoom = ({ route }: FixMeLater) => {
    const auth = useAppSelector(state => state.authentication)
    const role = useAppSelector(state => state.role.data)
    
    const attendanceDispatch = useAppDispatch();

    const params = route.params as IAttendance;

    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [visibleMessage, setVisibleMessage] = useState<boolean>(false);

    const showFormModal = () => setVisibleForm(true);
    const hideFormModal = () => setVisibleForm(false);

    const showMessageModal = () => setVisibleMessage(true);
    const hideMessageModal = () => setVisibleMessage(false);
    
    const handleValid = () => {
        //useForm! <- update status
        const validatedData: IAttendance = {
            ...params,
            status: "Approve",
            verifyBy: auth.user?.id,
            verifyAt: dayjs().toISOString(),
            description: '',
        }

        console.log(validatedData)

        attendanceDispatch(validateAttendance(validatedData))
        attendanceDispatch(getAttendances(validatedData!.institution as string))
        hideMessageModal();
        navigate("Home");
    }

    return (
        <ScrollView contentContainerStyle={style.container}>
            <View>
                <Text variant="displayLarge" style={{fontWeight: '700'}}>{params.roomName}</Text>
            </View>

            <View style={style.card}>
                <Text variant="bodyLarge" style={style.cardText}>Submitted In:</Text>
                <Text variant="titleMedium" style={{flex: 0.7}}>{dayjs(params.submitAt).format("HH:MM A - MMMM DD, YYYY")}</Text>
            </View>

            <View style={style.card}>
                <Text variant="bodyLarge" style={style.cardText}>Submitted by:</Text>
                <Text variant="titleMedium" style={{flex: 0.7}}>{params.submitBy}</Text>
            </View>

            <View style={style.card}>
                <Text variant="bodyLarge" style={style.cardText}>Status:</Text>
                <Text variant="titleMedium" style={[{flex: 0.7}, params.status === IsValid.pending ? style.pendingText : params.status === IsValid.approve ? style.validText : style.invalidText]}>{params.status}</Text>
            </View>

            {params.status === IsValid.reject ?
                <View>
                    <Text variant="titleMedium" style={{marginBottom: 8}}>Reason for invalid attendance:</Text>
                    <Text variant="bodyLarge" style={{ fontStyle: 'italic' }}>
                        {params.description}
                    </Text>
                </View>
            : undefined}

            {role.employee && params.status === IsValid.pending ?
                <View style={[style.card, style.buttonContainer]}>
                    <Button
                    mode="contained"
                    onPress={showMessageModal}
                    style={style.cardButton}>
                        Valid
                    </Button>

                    <Button
                    mode="outlined"
                    onPress={showFormModal}
                    style={style.cardButton}>
                        Invalid
                    </Button>
                </View>
            : undefined}

            <ModalForm
            roomData={params}
            validator={auth.user?.id}
            title="Reason for invalid attendance"
            visible={visibleForm}
            hideModal={hideFormModal} />
            
            <ModalMessage
            validator={auth.user?.id}
            deny="No"
            accept="Yes"
            handleAccept={handleValid}
            title="Warning"
            description={`Are you sure that ${params.submitBy} is actually using ${params.roomName}?`}
            visible={visibleMessage}
            hideModal={hideMessageModal} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 20,
        gap: 8,
        flex: 1,
    },
    card: {
        flexDirection: "row",
        gap: 12,
    },
    buttonContainer: {
        flexDirection: "row-reverse",
        position: "absolute",
        bottom: 24,
        left: 20,
        zIndex: 1
    },
    cardButton: {
        flex: 1
    },
    cardText: {
        flex: 0.3
    },
    validText: { color: "#0DA400", fontStyle: 'italic' },
    pendingText: { color: "#C1AD00", fontStyle: 'italic' },
    invalidText: { color: "#C02807", fontStyle: 'italic' },
})

export default SelectedRoom