import http from "./http-common"
import IUser from "../../types/IUser";

class UserService {
    private userCommon:string = "/user"

    addFCMToken (id: string, token: string) {
        return http.put(`${this.userCommon}/add/fcm/${id}`, { fcmToken: token })
    }

    getAPIKey () {
        return http.get(`${this.userCommon}/key`)
    }

    getUser(uid: string) {
        return http.get<IUser>(`${this.userCommon}/view/s/${uid}`)
    }

    getUsers() {
        return http.get<Array<IUser>>(`${this.userCommon}/view/all`)
    }

    getUserCredentials(uid: string) {
        return http.get(`${this.userCommon}/view/s/auth/${uid}`)
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

export default new UserService()