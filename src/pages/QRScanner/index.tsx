import { Alert, Linking, StyleSheet, View } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"
import { BarCodeReadEvent } from "react-native-camera"
import { Button, MD3Theme, Text, useTheme } from "react-native-paper"
import ModalLoading from "../../components/ModalLoading"
import { useCallback, useMemo, useState } from "react"
import QRStyle from "../../assets/styles/QRStyle"
import { useSubject } from "../../hooks/useSubject"
import useModal from "../../hooks/useModal"
import ModalComponent from "../../components/ModalMessage"
import { useRooms } from "../../hooks/useRooms"

const QRScanner = () => {
    const {
        openModal,
        handleOpenModal,
        handleCloseModal,
        content,
        setContent,
    } = useModal()

    const { getRoom } = useRooms()
    const { getSubjectsByCurrentTime } = useSubject()

    const theme = useTheme();

    const [ loading, setLoading ] = useState<boolean>(false);

    const onSuccess = async (e: BarCodeReadEvent) => {
        const link = e.data

        const supported = await Linking.canOpenURL(link)

        if (!supported) {
            setContent({
                title: "Invalid QR Code",
                message: "This QR Code is not supported in this app. Scan another QR Code."
            })
            handleOpenModal();
            setLoading(false)
            return
        }

        const splitURL = link.split('/')
        const roomID = splitURL[splitURL.length - 1]

        // setContent({
        //     title: "Valid QR Code",
        //     message: "This QR Code is supported in this app."
        // })

        // handleOpenModal();

        //Find a subject. If find subject is undefined, then provide an error

        // console.log(getSubjectsByCurrentTime().find(subject => subject.ROOM_ID === roomID))
        const subject = getSubjectsByCurrentTime().find(subject => subject.ROOM_ID === roomID)

        //console.log(getSubjectsByCurrentTime())

        if (!subject) {
            setContent({
                title: "No Ongoing Subjects",
                message: `There are no subjects currently on going at this hour on ${getRoom(roomID)?.ROOM_NAME}. Come back later.`
            })
            handleOpenModal();
            setLoading(false)
            return
        }

        // if (getSubjectsByCurrentTimeAndRoom(roomID).length === 0) {
        //     Alert.alert(`Error`, 'There are no subjects that are currently ongoing at this hour. Come back later.')
        //     setLoading(false)
        //     return
        // }

        // console.log(link)

        await Linking.openURL(link)
            // .then((result) => {
            //     console.log(result)
            // })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onReadSuccess = useCallback(onSuccess, [])

    const styles = useMemo(() => qrStyles(theme), [theme])

    return(
        <View style={QRStyle.scannerContainer}>
            <QRCodeScanner
            onRead={onReadSuccess}
            containerStyle={styles.qrContainerStyle}
            cameraStyle={styles.qrCameraStyle}
            cameraContainerStyle={styles.qrCameraContainerStyle}
            // topContent={}
            topViewStyle={styles.qrTopViewStyle}
            // bottomContent={}
            bottomViewStyle={{}}
            reactivate={true}
            reactivateTimeout={2000}
            showMarker
            markerStyle={styles.qrMarkerStyle}/>

            <ModalLoading visible={loading}/>

            <ModalComponent visible={openModal}>
                <ModalComponent.Header>
                    <Text>{ content.title }</Text>
                </ModalComponent.Header>
                <ModalComponent.Body>
                    <Text>{ content.message }</Text>
                </ModalComponent.Body>
                <ModalComponent.Footer>
                    <Button
                    onPress={() => handleCloseModal()}>
                        OKAY
                    </Button>
                </ModalComponent.Footer>
            </ModalComponent>
        </View>
    )
}

const qrStyles = (theme: MD3Theme) => StyleSheet.create({
    qrContainerStyle: { borderColor: 'blue' },
    qrCameraStyle: { overflow: 'hidden' },
    qrCameraContainerStyle: {},
    qrMarkerStyle: {
        borderColor: theme.colors.primary,
        borderStyle: 'solid',
        borderRadius: 8,
    },
    qrTopViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrBottomViewStyle: {}
})

export default QRScanner