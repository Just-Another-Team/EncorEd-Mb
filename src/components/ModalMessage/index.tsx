import { StyleSheet, View } from "react-native";
import { Button, MD3Colors, Modal, Portal, Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

type ModalMessageCardType = {
    visible: boolean;
    children: React.ReactNode;
}

type ModalContentType = {
    children: React.ReactNode
}

const ModalComponent = ({ 
    visible,
    children,
}: ModalMessageCardType) => {
    
    return(
        <Portal>
            <Modal
            visible={visible}
            dismissable={false}
            style={{ padding: 24 }}
            contentContainerStyle={style.container}>
                { children }
            </Modal>
        </Portal>
    )
}

const Header = ({ children }: ModalContentType) => {
    return(
        <View style={style.modalHeaderContainer}>
            {children}
        </View>
    )
}

const Body = ({ children }: ModalContentType) => {
    return(
        <View style={style.modalBodyContainer}>
            {children}
        </View>
    )
}

const Footer = ({ children }: ModalContentType) => {
    return(
        <View style={style.modalFooterContainer}>
            {children}
        </View>
    )
}

ModalComponent.Header = Header
ModalComponent.Body = Body
ModalComponent.Footer = Footer

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        gap: 16,
        borderRadius: 10,
    },
    modalHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    modalBodyContainer: {},
    modalFooterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

export default ModalComponent