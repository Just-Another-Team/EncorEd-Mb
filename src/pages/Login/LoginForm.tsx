import { GestureResponderEvent, StyleSheet, View } from "react-native"
import ControlledTextInput from "../../components/TextInput"
import { Control, FieldValues, useForm } from "react-hook-form"
import { Button, MD3Theme, Text, useTheme } from "react-native-paper"
import { useMemo } from "react"
import { InputType } from "../../types/InputType"

type LoginFormType = {
    onLogin: (e: GestureResponderEvent) => void;
    control: Control<FieldValues> | undefined;
}

const LoginForm = ({
    onLogin,
    control
}: LoginFormType) => {
    const theme = useTheme();

    const loginInputs: Array<InputType> = [
        {
            name: "email",
            label: "Email",
            rules: {
                required: "Email is required!"
            }
        },
        {
            name: "password",
            label: "Password",
            rules: {
                required: "Password is required!"
            },
            secureTextEntry: true,
        }
    ]

    const styles = useMemo(() => loginFormStyle(theme), [theme])

    return (
        <View
        style={styles.container}>
            {/* EncorEd Attendance Checker Logo */}

            <Text
            variant="headlineMedium"
            style={styles.headline}>
                SIGN IN
            </Text>

            {loginInputs.map((input, index) => (
                <ControlledTextInput
                key={index}
                control={control}
                name={input.name}
                label={input.label}
                secureTextEntry={input.secureTextEntry}
                rules={input.rules}
                mode="outlined"
                style={{
                    width: "100%"
                }}/>
            ))}

            <Button
            onPress={onLogin}
            style={styles.button}
            mode="contained">
                SUBMIT
            </Button>
        </View>
    )
}

const loginFormStyle = (theme: MD3Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        padding: 16,
        borderRadius: 8,
        gap: 4
    },
    button: {
        marginTop: 24,
    },
    headline: {
        fontWeight: "700",
    }
})

export default LoginForm