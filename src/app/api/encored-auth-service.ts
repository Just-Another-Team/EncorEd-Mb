import http from "./http-common"
import { ILogin } from "../../types/ILogin"

type SignInResponse = {
    idToken: string; 
    email: string;
    refreshToken: string; 
    expiresIn: string; 
    localId: string;
    registered: boolean;
}

class EncorEdAuthService {

    getAPIKey () {
        return http.get<string>("/user/key")
    }

    signIn (loginCredentials: ILogin, key: string) {
        return http.post<SignInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {...loginCredentials, returnSecureToken: true})
    }

    // signUp(data: any) {
    //     return http.post("/user/signUp", data)
    // }

    // signIn(credentials: Credentials) {
    //     return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    // }

    // async signOut() {
    //     console.log("Signing Out")

    //     return await signOut(auth)
    //         .then((res) => {
    //             return res
    //         })
    //         .catch((error) => {
    //             throw error
    //         })
    // }

    // addUser(data: FixMeLater) {
    //     return http.post("/user/add", data)
    // }

    // updateUser(data: FixMeLater) {
    //     const {id, firstName, lastName, email, userName, newPassword} = data

    //     const newUserDetail = {
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         userName: userName,
    //         password: newPassword
    //     }

    //     return http.put(`/user/update/${id}`, newUserDetail)
    // }

    // deleteUser(data: any) {
    //     const {id} = data
    //     return http.put(`/user/update/${id}`)
    // }

    // getAll() {
    //     return http.get("/user/list")
    // }

    // get(data: string) {
    //     return http.get(`/user/list/${data}`)
    // }
}

export default new EncorEdAuthService()