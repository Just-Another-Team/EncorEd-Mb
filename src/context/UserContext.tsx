import { createContext, Dispatch, useEffect, useState } from "react";
// import IUser, { UserRole } from "../data/IUser";
import userService from "../app/api/user-service";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../app/firebase/config";
import { converter } from "../types/converter";
// import useDepartment from "../hooks/useDepartment";
import { useAuth } from "../hooks/useAuth";
import IUser, { UserRole } from "../types/IUser";
import useDepartment from "../hooks/useDepartment";
import { AxiosResponse } from "axios";

type UserContextType = {
    users: Array<IUser>
    getCurrentUser: () => IUser | undefined
    getTeachers: () => Array<IUser>
    getUsers: () => Array<IUser>
    getUser: (userId: string) => IUser | undefined
    addFCMToken: (token: string) => Promise<AxiosResponse<any, any>>
    load: boolean,
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

type UserProviderType = {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderType) => {
    const { user } = useAuth()
    const { departments } = useDepartment()

    const [users, setUsers] = useState<Array<IUser>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const addFCMToken = (token: string) => {
        return userService.addFCMToken(user?.uid!, token)
    }

    const getTeachers = () => {
        return users.filter(user => (user.ROLE_ID as UserRole).teacher)
    }

    const getUser = (userId: string) => {
        return users.find(user => user.USER_ID === userId)
    }

    const getUsers = () => {
        return users.map((user): IUser => {
            const department = departments.find(department => department.DEPT_ID === user.DEPT_ID as string)

            return ({
                ...user,
                DEPT_ID: department ? department : null,
            })
        })
    }

    const getCurrentUser = () => {
        return users.find(userDb => userDb.USER_ID === user?.uid)
    }

    const userCollection = query(collection(db, '/User/').withConverter(converter<IUser>()))

    useEffect(() => {
        const fetchUsers = onSnapshot(userCollection, (snapshot) => {
            const userArray = snapshot.docs.map((user): IUser => {

                const userData = user.data()

                return ({
                    USER_ID: user.id,
                    ...userData,
                    USER_FULLNAME: (userData.ROLE_ID as UserRole).admin ? "admin" : `${userData.USER_FNAME} ${userData.USER_MNAME !== null ? userData.USER_MNAME : ""} ${userData.USER_LNAME}`
                })
            })

            setUsers(userArray)
        }, (error) => {
            console.error(error)
        })

        return () => {
            fetchUsers()
            setLoad(false)
        }
    }, [user])

    useEffect(() => {
        console.log("User Context: ", getCurrentUser())
    }, [load])

    const value = {
        users,
        setLoad,
        getTeachers,
        getCurrentUser,
        getUsers,
        getUser,
        addFCMToken,
        load,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}