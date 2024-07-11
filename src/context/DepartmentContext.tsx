import { createContext, useEffect, useState } from "react";
// import IDepartment from "../data/IDepartment";
// import departmentService from "../app/api/department-service";
import IUser from "../types/IUser";
import IDepartment from "../types/IDepartment";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
// import IUser from "../data/IUser";

type DepartmentContextType = {
    departments: Array<IDepartment>
    getDepartments: (users: Array<IUser>) => Array<IDepartment>
    getDepartment: (departmentId: string) => IDepartment | undefined
    load: boolean
}

export const DepartmentContext = createContext<DepartmentContextType>({} as DepartmentContextType);

type DepartmentProviderType = {
    children: React.ReactNode;
}

export const DepartmentProvider = ({ children }: DepartmentProviderType) => {
    const [ departments, setDepartments ] = useState<Array<IDepartment>>([]);
    const [ load, setLoad ] = useState<boolean>(true);
    
    const getDepartments = (users: Array<IUser>) => {
        return departments.map((department): IDepartment => {

            const assignedUsers = users.filter(user => user.DEPT_ID === department.DEPT_ID).length

            return ({
                ...department,
                DEPT_NOOFUSERS: assignedUsers,
            })
        })
    }

    const getDepartment = (departmentId: string) => {
        return departments.find(department => department.DEPT_ID === departmentId)
    }

    const departmentCollection = collection(db, '/Department/').withConverter(converter<IDepartment>())

    useEffect(() => {
        const fetchUsers = onSnapshot(departmentCollection, (snapshot) => {
            const departmentArray = snapshot.docs.map((department): IDepartment => {

                const departmentData = department.data()

                return ({
                    DEPT_ID: department.id,
                    ...departmentData,
                })
            })

            setDepartments(departmentArray)
        }, (error) => {
            console.error(error)
        })

        return () => {
            fetchUsers()
            setLoad(false)
        }
    }, [load])

    const value = {
        departments,
        getDepartments,
        getDepartment,
        load
    }

    return (
        <DepartmentContext.Provider value={value}>
            { children }
        </DepartmentContext.Provider>
    )
}

export default DepartmentContext