import { createContext, useEffect, useState } from "react";
import IAttendance from "../types/IAttendance";
import { db, onSnapshot } from "../app/firebase/config";
import IUser from "../types/IUser";
import dayjs from "dayjs";
import ISubject from "../types/ISubject";
import { query, collection } from "firebase/firestore";
import { converter } from "../types/converter";
import userService from "../app/api/user-service";
import subjectService from "../app/api/subject-service";
import roomService from "../app/api/room-service";
import IRoom from "../types/IRoom";
import { AttendanceSubmissionDate } from "../data/AttendanceSubmissionDate";
import { AttendanceStatus } from "../data/AttendanceStatus";

type AttendanceContextType = {
    attendances: Array<IAttendance>;
    getRecentAttendances: (userId: string) => IAttendance[];
    getAttendancesByReduction: (attdArray: Array<IAttendance>) => IAttendance[];
    getAttendancesByCurrentDay: () => IAttendance[];
    load: boolean;
}

export const AttendanceContext = createContext<AttendanceContextType>({} as AttendanceContextType);

type AttendanceProviderType = {
    children: React.ReactNode;
}

export const AttendanceProvider = ({ children }: AttendanceProviderType) => {
    const [attendances, setAttendances] = useState<Array<IAttendance>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const getRecentAttendances = (userId: string) => {
        return attendances?.filter(attendance => {
            // console.log(attendance.ATTD_SUBMISSIONDATE)
            const attendanceDate = dayjs(attendance.ATTD_SUBMISSIONDATE as string);
            return (attendance.USER_ID as IUser).USER_ID === userId && dayjs().isSame(dayjs(attendanceDate), 'day')
        })
    }

    const getAttendancesByReduction = (attdArray: Array<IAttendance>) => {
        return attdArray.reduce((prev, curr, ind, _) => {
            //If one of the PREVIOUS ATTENDANCES and current attendance are the same subject and in the same day submitted
            const prevAttd = prev.find(attd => {
                const prevAttdSubDay = dayjs(attd.ATTD_SUBMISSIONDATE as string)
                const currAttdSubDay = dayjs(curr.ATTD_SUBMISSIONDATE as string)

                const prevAttdSubj = attd.SUB_ID as ISubject
                const currAttdSubj = curr.SUB_ID as ISubject

                return currAttdSubj.SUB_ID === prevAttdSubj.SUB_ID && currAttdSubDay.isSame(prevAttdSubDay, 'day')
            })

            // If there is no current attendance, then push the current attendance to the array
            if (prevAttd === undefined) {
                prev.push(curr)
                return prev
            }

            const mergedAttendance: IAttendance = {
                ...prevAttd,
                ...curr,
                ATTD_TEACHERSTATUS: AttendanceStatus(prevAttd.ATTD_TEACHERSTATUS as string, curr.ATTD_TEACHERSTATUS as string),
                ATTD_SUBMISSIONDATE: {
                    firstSubmission: prevAttd.ATTD_SUBMISSIONDATE,
                    lastSubmission: curr.ATTD_SUBMISSIONDATE,
                } as AttendanceSubmissionDate
            }

            // The mergedAttendance is duplicated from the previousAttendance
            // Replace or erase the previousAttendance with the mergedAttendance

            const newArray = prev.filter(pAttd => pAttd.ATTD_ID !== prevAttd.ATTD_ID)
            newArray.push(mergedAttendance)

            return newArray
        }, [] as Array<IAttendance>)
    }

    const getAttendancesByCurrentDay = () => {
        const currentAttendances = getAttendancesByReduction(attendances).filter((attendance) => {
            const currDay = dayjs()
            return dayjs((attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission ? (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission as string : attendance.ATTD_SUBMISSIONDATE as string, currDay.toISOString()).isSame(currDay, 'day')
        })

        return currentAttendances
    }

    const attendanceCollection = query(collection(db, '/Attendances/').withConverter(converter<IAttendance>()))

    useEffect(() => {
        const fetchAttendancesSnapshot = onSnapshot(attendanceCollection, async (snapshot) => {
            const attendanceDocs = snapshot.docs.map(async (attendance): Promise<IAttendance> => {

                const user = await userService.getUser(attendance.data().USER_ID as string)
                const subject = await subjectService.view(attendance.data().SUB_ID as string)
                const room = await roomService.view(attendance.data().ROOM_ID as string)

                return ({
                    ATTD_ID: attendance.id,
                    ...attendance.data() as IAttendance,
                    USER_ID: user.data as IUser,
                    SUB_ID: subject.data as ISubject,
                    ROOM_ID: room.data as IRoom
                })
            })

            const attendancesArray = await Promise.all(attendanceDocs)
            attendancesArray.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)

            setAttendances(attendancesArray)
        }, (error) => {
            console.error('Attendance Context Error', error)
        })

        return () => {
            fetchAttendancesSnapshot()
            setLoad(false)
        }
    }, [])

    const value = {
        attendances,
        getRecentAttendances,
        getAttendancesByReduction,
        getAttendancesByCurrentDay,
        load
    }

    return (
        <AttendanceContext.Provider value={value}>
            { children }
        </AttendanceContext.Provider>
    )
}