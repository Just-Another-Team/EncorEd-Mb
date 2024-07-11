import { useState } from "react"
import { useForm } from 'react-hook-form'
import { ScrollView } from "react-native"
import LoginForm from "./LoginForm"
import { ILogin } from "../../types/ILogin"
import ModalLoading from "../../components/ModalLoading"
import LoginLogo from "./LoginLogo"
import { FirebaseError } from "firebase/app"
import { AuthErrorCodes } from "firebase/auth"
import { useAuth } from "../../hooks/useAuth"
import { useUsers } from "../../hooks/useUsers"

const Login = () => {
    const { load, login } = useAuth();
    const { getCurrentUser } = useUsers()

    const [openLoading, setOpenLoading] = useState<boolean>(false);

    const { control, handleSubmit, setError, reset } = useForm<ILogin>({
        defaultValues: {
            email: null,
            password: null
        }
    })

    const handleLoginError = (error: any) => {
        setOpenLoading(false);

        if (error instanceof FirebaseError) {
            console.error(error)

            if (error.code === AuthErrorCodes.INVALID_PASSWORD) setError('password', { type: "Firebase Auth", message: "Invalid Password" } )
        
            //too many request
        }

        console.error(error)
    }

    const onLogin = async (data: ILogin) => {
        setOpenLoading(true);

        await login(data.email!, data.password!)
            //Read all of the attendance here
            .then((result) => {
                setOpenLoading(false);
            })
            .catch(handleLoginError)
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
            visible={openLoading || load}
            title="Signing In. Please wait."/>

            {/* Error Modal */}
        </ScrollView>
    )
}

export default Login