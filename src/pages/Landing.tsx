import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import {Button} from 'react-native-paper'
import * as navigation from '../navigators/RootNavigation'

const Landing = () => {

    return(
        <View style={styles.container}>
            <Image
            source={require('../images/landingpagepic.png')}
            />

            <Text style={[styles.centerText, styles.h2]}>Your Smart Campus Guide</Text>
            <Text style={[styles.centerText, styles.p]}>Register now and experience of navigating campus with EncorEd</Text>
        
            <View 
            style={{
                width: '100%',
                gap: 12,
                marginTop: 32,
            }}>
                <Button
                mode="contained"
                buttonColor="#296EB4"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate("Login")}
                labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                style={{padding: 6, borderRadius: 128}}>
                    SIGN IN
                </Button>

            </View>
        
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
        fontWeight: 'bold',
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