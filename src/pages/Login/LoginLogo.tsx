import { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native"
import { MD3Theme, Text, useTheme } from 'react-native-paper'

const LoginLogo = () => {
    const theme = useTheme();
    const styles = useMemo(() => loginStyle(theme), [theme])

    return(
        <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
                <Image
                style={styles.logo}
                source={require("../../assets/images/Logo.png")}/>

                <Text
                variant="displaySmall"
                style={styles.title1}>
                    Encor<Text style={styles.title2}>Ed</Text>
                </Text>
            </View>
            <Text
            variant="headlineSmall"
            style={styles.subtitle}>
                Attendance Checking
            </Text>
            <Text
            variant="headlineSmall"
            style={styles.subtitle}>
                QR Scanner
            </Text>
        </View>
    )
}


const loginStyle = (theme: MD3Theme) => StyleSheet.create({
    logo: {
        width: 128,
        height: 128,
    },

    imageContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 16,
    },
    titleContainer: { marginBottom: 56 },

    title1: { 
        fontWeight: '700',
        color: theme.colors.primary
    },
    title2: {
        fontWeight: '700',
        color: theme.colors.tertiary
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: '700',
        color: theme.colors.secondary
    }
})

export default LoginLogo