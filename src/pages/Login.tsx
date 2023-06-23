import React from "react"
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Alert
} from 'react-native'
import {
    Button,
    TextInput
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Login = () => {
    return(
        <View style={styles.container}>
            <Image
            source={require('../assets/Logo.png')}
            style={{
                width: 200,
                height: 200
            }}/>
            <Text style={[styles.centerText, styles.title]}>Encor<Text style={{color: '#FDB833'}}>Ed</Text></Text>
        
            <View style={styles.loginContainer}>
                <Text style={[styles.h5, styles.centerText, styles.textPrimary]}>Login Account</Text>         
                <TextInput
                placeholder="Email"
                textContentType={'emailAddress'}
                placeholderTextColor='#7FA8D2'
                outlineColor="#FFFFFF"
                activeOutlineColor="#296EB4"
                textColor="#548BC3"
                mode="outlined"
                left={
                    <TextInput.Icon
                    icon={() => <Icon name="user" size={24} style={{color: '#585667'}} color='#585667' />}
                    />
                }
                style={{backgroundColor: '#FFFFFF'}} />
                
                <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor='#7FA8D2'
                outlineColor="#FFFFFF" 
                activeOutlineColor="#296EB4"
                textColor="#548BC3"
                mode="outlined"
                left={
                    <TextInput.Icon
                    icon={() => <Icon name="lock" size={24} color='#585667' />}
                    />
                }
                style={{backgroundColor: '#FFFFFF'}} />
                
                <Button
                mode="contained"
                buttonColor="#296EB4"
                textColor="#FDB833"
                labelStyle={{fontSize: 16, fontWeight: 'bold'}}
                style={{padding: 6, borderRadius: 128, marginTop: 32}}>
                    LOGIN
                </Button>
            </View>

            <Text style={styles.p}>Don't have an account? <Text style={{color: '#FDB833', fontWeight: 'bold'}}>SIGN UP</Text></Text>

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
    loginContainer: {
        backgroundColor: '#A2D0FE',
        width: '100%',
        borderRadius: 30,
        display: 'flex',
        gap: 16,
        marginTop: 32,
        padding: 24
    },
    centerText: {
        textAlign: 'center'
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    h4: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    h5: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#296EB4'
    },
    p: {
        fontSize: 18,
    },
    textPrimary: {
        color: '#296EB4'
    }
})

export default Login