import http from "./http-common"
import { auth, onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "../firebase/authentication"
import EncoredRoleServices from "./encored-role-services"
import EncoredInstitutionService from "./encored-institution-service"
import { Credentials } from "../../types/input"
import { UserCredential } from "firebase/auth"
import { FixMeLater } from "../../types/FixMeLater"

class EncorEdAuthService {
    signUp(data: any) {
        return http.post("/user/signUp", data)
    }

    signIn(credentials: Credentials) {
        return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    }

    async signOut() {
        console.log("Signing Out")

        return await signOut(auth)
            .then((res) => {
                return res
            })
            .catch((error) => {
                throw error
            })
    }

    addUser(data: FixMeLater) {
        return http.post("/user/add", data)
    }

    updateUser(data: FixMeLater) {
        const {id, firstName, lastName, email, userName, newPassword} = data

        const newUserDetail = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: newPassword
        }

        return http.put(`/user/update/${id}`, newUserDetail)
    }

    deleteUser(data: any) {
        const {id} = data
        return http.put(`/user/update/${id}`)
    }

    getAll() {
        return http.get("/user/list")
    }

    get(data: string) {
        return http.get(`/user/list/${data}`)
    }
}

export default new EncorEdAuthService()