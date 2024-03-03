import { FixMeLater } from "../../types/FixMeLater";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Modal, Portal, Text, TextInput, } from "react-native-paper";

type ModalLoadingType = {
    visible: boolean;
    title?: string;
}

const ModalLoading = ({ visible, title = "Loading" }: ModalLoadingType) => {
    return(
        <Portal>
            <Modal
            visible={visible}
            dismissable={false}
            style={{ padding: 24 }}
            contentContainerStyle={style.containerStyle}>
                {/* <Text variant="bodyLarge">{description}</Text> */}

                <ActivityIndicator size={48} animating={true}/>

                <Text variant="titleMedium" style={{textAlign: 'center'}}>{title}</Text>
            </Modal>
        </Portal>
    )
}

const style = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#FEFEFE',
        padding: 20,
        gap: 16,
        borderRadius: 10,
    },
})

export default ModalLoading