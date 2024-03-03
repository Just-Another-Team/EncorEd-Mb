import { Alert, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useAppDispatch, useAppSelector } from "../../app/encored-redux-hooks";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";
import { navigate } from "../../routes/RootNavigation";
import { getAttendances, submitAttendance } from "../../app/features/attendance/attendanceSlice";
import dayjs from "dayjs";
import ModalMessage from "../../components/ModalMessage";
import { useState } from "react";


const Attendance = () => {
    const userSelector = useAppSelector(state => state.authentication)
    const institutionSelector = useAppSelector(state => state.institution)
    const attendanceDispatch = useAppDispatch();

    const { control, reset, handleSubmit } = useForm<{room?: string | null}>({
        defaultValues: {
            room: "",
        }
    })

    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const handleCancel = () => {
        reset();
        navigate('Dashboard');
    }

    const handleAttendance = (data: {room?: string | null}) => {
        const attendance = {
            roomName: data.room,
            institution: institutionSelector.data!.id,
            submitAt: dayjs(),
            submitBy: userSelector.user?.id
        }

        attendanceDispatch(submitAttendance(attendance)).unwrap().then(() => {
            attendanceDispatch(getAttendances(attendance.institution))
            reset();
            showModal();
        }).catch(err => {
            Alert.alert("Error", `There is an error while adding attendance:\n${err}`);
        })
    }

    const handleAccept = () => {
        hideModal();
        navigate('LoggedIn')
    }

    return(
        <ScrollView contentContainerStyle={{paddingLeft: 20, paddingTop: 10, paddingBottom: 20, paddingRight: 20, gap: 16, flex: 1}}>
            <View>
                <Text variant="titleLarge" style={{fontWeight: '700'}}>Room to Use</Text>

                <Controller
                name="room"
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {value, onChange, onBlur}}) => (<TextInput onChangeText={onChange} onBlur={onBlur} value={value!} mode="outlined" />)}/>
            </View>
            
            <View style={[style.card, style.buttonContainer]}>
                <Button
                mode="contained"
                onPress={handleSubmit(handleAttendance)}
                style={style.cardButton}>
                    Submit
                </Button>

                <Button
                mode="outlined"
                onPress={handleCancel}
                style={style.cardButton}>
                    Cancel
                </Button>
            </View>

            {/* ModalMessage = ({ visible, validator, roomData, description, hideModal, title = "Sample Title" } */}
            <ModalMessage title="Success" hideModal={hideModal} handleAccept={handleAccept} accept="Okay" description="Attedance submitted successfully!" visible={visibleModal} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        gap: 16,
        borderRadius: 10,
    },
    card: {
        flexDirection: "row",
        gap: 12,
    },
    cardButton: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: "row-reverse",
        position: "absolute",
        bottom: 24,
        left: 20,
        zIndex: 1
    },
})


export default Attendance