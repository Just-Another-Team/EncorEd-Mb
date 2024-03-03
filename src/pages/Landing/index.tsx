import React from "react"
import {
    View,
    StyleSheet,
    Image,
    GestureResponderEvent,
} from 'react-native'
import {
    Button,
    Text,
    useTheme
} from 'react-native-paper'
import { defaultStyle } from "../../assets/styles/defaultStyle";
// import { LandingPage } from "../../assets/images/landingpagepic.png"

const Landing = () => {

    const theme = useTheme();

    const handleOnSignIn = (e: GestureResponderEvent) => {

    }

    return(
        <View>
            {/* <Image
            source={}
            /> */}

            <Text
            variant="displaySmall"
            style={[defaultStyle.font400, defaultStyle.centerText]}>
                The Attendance Checking QR Scanner
            </Text>
        
            <Button
            onPress={handleOnSignIn}
            contentStyle={{
                padding: 2,
            }}
            mode="contained">
                <Text
                variant="titleLarge"
                style={[
                    defaultStyle.font600,
                    {
                        color: theme.colors.onPrimary,
                    }
                ]}>
                    SIGN IN
                </Text>
            </Button>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#FFFFFF",
        padding: 28
    },
    centerText: {
        textAlign: 'center',
        color: '#45A1FD'
    },
    h1: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },
    h2: {
        fontSize: 40,
        fontWeight: '700',
        fontFamily: 'Inter'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#296EB4'
    },
    p: {
        fontSize: 24,
    }
})

export default Landing