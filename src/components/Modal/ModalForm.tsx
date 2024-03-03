import { useState } from "react";
import { FixMeLater } from "../../types/FixMeLater";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TextInput, } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/encored-redux-hooks";
import { getAttendances, validateAttendance } from "../../app/features/attendance/attendanceSlice";
import IAttendance from "../../types/IAttendance";
import { IsValid } from "../../types/IsValid";
import { navigate } from "../../routes/RootNavigation";
import dayjs from "dayjs";

const ModalForm = ({ visible, validator, roomData, hideModal, title = "Sample Title" }: FixMeLater) => {
    const attendanceDispatch = useAppDispatch();

    const { control, reset, handleSubmit } = useForm<{description?: string | null}>({
        defaultValues: {
            description: "",
        }
    })

    const handleValid = (data: {description?: string | null}) => {
        //useForm! <- update status and enter description
        const validatedData: IAttendance = {
            ...roomData as IAttendance,
            status: IsValid.reject,
            verifyBy: validator,
            verifyAt: dayjs().toISOString(),
            description: data.description!
        }

        attendanceDispatch(validateAttendance(validatedData))
        attendanceDispatch(getAttendances(validatedData.institution!))

        reset();
        hideModal();
        navigate('Home')
    }

    return(
        <Portal>
            <Modal
            visible={visible}
            //onDismiss={hideModal}
            dismissable={false}
            style={{ padding: 20 }}
            contentContainerStyle={style.containerStyle}>
                <Text variant="titleLarge" style={{fontWeight: '700'}}>{title}</Text>

                <Controller
                name="description"
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {value, onChange, onBlur}}) => (<TextInput onChangeText={onChange} onBlur={onBlur} value={value!} mode="outlined" multiline numberOfLines={5} />)}/>

                <View style={style.buttonContainer}>
                    <Button
                    mode="contained"
                    onPress={handleSubmit(handleValid)}>
                        Submit
                    </Button>

                    <Button
                    mode="outlined"
                    onPress={hideModal}>
                        Cancel
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const style = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        gap: 16,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        gap: 8
    }
})

export default ModalForm