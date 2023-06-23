import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import {Button} from 'react-native-paper'
import { AuthStackParamList } from "../navigators/AuthStack"
import { useNavigation } from "@react-navigation/native"

type authScreenNavigationType = NativeStackNavigationProp<AuthStackParamList, 'Landing'>

const Landing = () => {

    const navigation = useNavigation<authScreenNavigationType>()

    return(
        <View style={styles.container}>
            <Image
            source={require('../assets/Logo.png')}
            style={{
                width: 200,
                height: 200
            }}/>
            <Text style={[styles.centerText, styles.title]}>Encor<Text style={{color: '#FDB833'}}>Ed</Text></Text>
            <Text style={[styles.centerText, styles.h1]}>Experience Campus Life like never before!</Text>
            <Text style={[styles.centerText, styles.p]}>Register now and experience the ultimate campus life with EncorEd!</Text>
        
            <View 
            style={{
                width: '100%',
                gap: 12,
                marginTop: 32,
            }}>
                <Button
                mode="contained"
                buttonColor="#FFFFFF"
                textColor="#296EB4"
                onPress={() => navigation.navigate("Login")}
                labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                style={{padding: 6, borderRadius: 128}}>
                    SIGN IN
                </Button>

                <Button
                mode="outlined"
                textColor="#FFFFFF"
                labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                style={{borderColor: '#FFFFFF', borderWidth: 1.5, padding: 6, borderRadius: 128}}>
                    SIGN UP
                </Button>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#45A1FD',
        padding: 28
    },
    centerText: {
        textAlign: 'center'
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#296EB4'
    },
    p: {
        fontSize: 18,
    }
})

export default Landing