import { Alert, Linking, StyleSheet, View } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"
import { BarCodeReadEvent, RNCamera } from "react-native-camera"
import { Text } from "react-native-paper"
import ModalLoading from "../../components/ModalLoading"
import { useCallback, useState } from "react"
import QRStyle from "../../assets/styles/QRStyle"

const QRScanner = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const onSuccess = (e: BarCodeReadEvent) => {
        const link = e.data

        setLoading(true);
        return Linking.openURL(link).then(() => {
            setLoading(false);
        }).catch((error) => {
            Alert.alert(`Error", "There is an error occured. The error is the following:\n${error}`)
        })
    }

    const onReadSuccess = useCallback(onSuccess, [])

    return(
        <View style={QRStyle.scannerContainer}>
            <QRCodeScanner
            onRead={onReadSuccess}
            // topContent={
            //     <Text style={style.centerText}>HELLO! (FROM QR CODE)</Text>
            // }
            topViewStyle={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
            // bottomContent={
            //     <Text>WORLD! (FROM QR CODE)</Text>
            // }
            bottomViewStyle={{}}
            reactivate={true}
            reactivateTimeout={2000}/>

            <ModalLoading visible={loading}/>
        </View>
    )
}

export default QRScanner