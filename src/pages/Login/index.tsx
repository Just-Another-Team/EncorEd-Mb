import { useMemo, useState } from "react"
import { useForm } from 'react-hook-form'
import { ScrollView, View, Image, StyleSheet } from "react-native"
import LoginForm from "./LoginForm"
import { ILogin } from "../../types/ILogin"
import encoredAuthService from "../../app/api/encored-auth-service"
import ModalLoading from "../../components/ModalLoading"
import ModalComponent from "../../components/ModalMessage"
import Icon from "react-native-paper/src/components/Icon"
import { MD3Colors, MD3Theme, Text, useTheme } from "react-native-paper"
import LoginLogo from "./LoginLogo"

const Login = () => {
    // const logindispatch = useAppDispatch();

    // const userLoading = useAppSelector(state => state.authentication.loading)
    // const roleLoading = useAppSelector(state => state.role.loading)
    // const institutionLoading = useAppSelector(state => state.institution.loading)

    

    const [openLoading, setOpenLoading] = useState<boolean>(false);

    const { control, handleSubmit, reset } = useForm<ILogin>({
        defaultValues: {
            email: null,
            password: null
        }
    })

    // const authenticationHandler:SubmitHandler<{emailUserName: string; password: string}> = (data) => {

    //     const userCredentials: Credentials = {
    //         email: data.emailUserName,
    //         password: data.password
    //     }
    //     console.log("Data Logged In", userCredentials)

    //     //GET USER
    //     logindispatch(getUser(userCredentials.email)).unwrap()
    //         .then((getUserRes) => {
    //             return logindispatch(signIn(userCredentials)).unwrap()
    //                 .then(() => {
    //                     //Get Institution
    //                     return logindispatch(getInstitution(getUserRes.data.institution)).catch(error => Promise.reject(error))
    //                 })
    //                 .then(() => {
    //                     //Get Role
    //                     //If it does not have any teacher or student roles. Then error
    //                     return logindispatch(getRole(getUserRes.data.id)).unwrap().then((res) => {
    //                         console.log("Role: ", res)

    //                         if (res.appAdmin || !!res.visitor)
    //                             return Promise.reject("auth/user-invalid-role")
    //                         else
    //                             return res
    //                     }).catch(error => Promise.reject(error)).catch(error => Promise.reject(error))
    //                 })
    //                 .then(() => {
    //                     logindispatch(logIn(getUserRes.data))
    //                     navigation.navigate("LoggedIn")
    //                     reset();
    //                 })
    //                 .catch((error) => Promise.reject(error))
    //         })
    //         .catch((error) => {
    //             console.log(error)

    //             if (error.code === "ERR_BAD_REQUEST" && error.response.data.code === "firestore/missing-email") setError("emailUserName", {message: "Email not found in the system's database. Please register"})

    //             if (error.code === 'auth/missing-email') setError("emailUserName", {message: "Email not found in the system's database. Please register"})

    //             if (error.code === "auth/network-request-failed") setError("emailUserName", {message: "Cannot log in. Please check your internet connection."})

    //             if (error.code === "ERR_NETWORK") setError("emailUserName", {message: `${error.message}.`})

    //             if (error.code === "auth/too-many-requests") setError("emailUserName", {message: `${error.message}.`})

    //             if (error.code === "auth/user-invalid-role" || error === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the mobile"})

    //             if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") setError("emailUserName", {message: "Invalid email"})

    //             if (error.code === "auth/wrong-password") setError("password", {message: "Invalid password"})
    //         })
    // }

    // useEffect(() => {
    //     logindispatch(resetUser())
    //     logindispatch(logOutInsitution())
    // }, [])

    const onLogin = async (data: ILogin) => {
        setOpenLoading(true);
        const key = await encoredAuthService.getAPIKey().then((key) => key.data).catch(error => error);

        encoredAuthService.signIn(data, key).then(credentials => {
            console.log("Successfully logged in!")
            setOpenLoading(false);
            reset();
        }).catch(error => {
            console.error(error)
        })
    }

    

    return(
        <ScrollView
        style={{
            padding: 16,
        }}>
            <LoginLogo />

            <LoginForm
            onLogin={handleSubmit(onLogin)}
            control={control}/>

            <ModalLoading
            visible={openLoading}
            title="Signing In. Please wait."/>

            {/* Error Modal */}
        </ScrollView>
    )
}

export default Login