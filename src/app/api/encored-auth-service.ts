import http from "./http-common"
import { auth, onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "../firebase/authentication"
import EncoredRoleServices from "./encored-role-services"
import EncoredInstitutionService from "./encored-institution-service"
import { Credentials } from "../../types/input"
import { UserCredential } from "firebase/auth"

class EncorEdAuthService {
    signUp(data: any) {
        return http.post("/user/signUp", data)
    }

    signIn(credentials: Credentials) {
        //signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        // const account = await signInWithEmailAndPassword(auth, userData.emailUserName, userData.password)
        //     .then(async (result) => {

        //         //Get User Data
        //         const userData = await this.get(result.user.email)
        //                 .then((res) => res)
        //                 .catch((error) => {throw error})

        //         //Get User Role
        //         const userRole = await EncoredRoleServices.getAssignedRoles(result.user.email)
        //                 .then((res) => {
        //                     return res
        //                 })
        //                 .catch((error) => {
        //                     console.error(error)
        //                     throw error
        //                 })

        //         console.log(userData.data)

        //         //Get User Institution
        //         const userInstitution = await EncoredInstitutionService.viewInstitution(userData.data.institution)
        //                 .then((res) => {
        //                     return res
        //                 })
        //                 .catch((error) => {
        //                     throw error
        //                 })

        //         //Get Subjects assigned to User

        //         //Get Events from Institution

        //         const loggedIn = {
        //             user: {
        //                 displayName: result.user.displayName,
        //                 email: result.user.email,
        //                 role: userRole.data,
        //                 institution: userInstitution.data,
        //                 ...userData.data,
        //             },
        //             token: result.user.accessToken
        //         }

        //         return loggedIn
        //     })
        //     .catch((error) => {
        //         throw error
        //     })

        // return account
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

    addUser(data: any) {
        return http.post("/user/add", data)
    }

    updateUser(data: any) {
        const {id, userData} = data
        return http.put(`/user/update/${id}`, userData)
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