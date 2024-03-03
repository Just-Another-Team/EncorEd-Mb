import { StyleSheet } from "react-native"

const QRStyle = StyleSheet.create({
    scannerContainer: {
        flex: 1
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 44,
        color: '#777'
    },
        textBold: {
        fontWeight: '500',
        color: '#000'
    },
        buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    loadingModal: {
        backgroundColor: "#FFFFFF"
    }
})

export default QRStyle