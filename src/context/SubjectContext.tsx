import { createContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";
import { useSchedules } from "../hooks/useSchedules";
import ISubject from "../types/ISubject";
import ISchedule from "../types/ISchedule";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekDays from "../types/weekDays";

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Asia/Manila")

type SubjectContextType = {
    subjects: Array<ISubject>
    load: boolean,
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    getSubjects: () => Array<ISubject>
    getOngoingSubjects: (subjects: Array<ISubject>, currentTime: string) => Array<ISubject>
    getSubjectsBySchedule: (currTime: Dayjs) => Array<ISubject>
    getSubjectsByCurrentTime: () => ISubject[]
}

export const SubjectContext = createContext<SubjectContextType>({} as SubjectContextType);

type SubjectProviderType = {
    children: React.ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderType) => {
    const { user } = useAuth()
    const { users } = useUsers()
    const { getSchedule } = useSchedules()

    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const getSubjects = (): Array<ISubject> => {
        return subjects.map(subject => {
           

            const schedule = getSchedule(subject.SCHED_ID as string)
            const user = users.find(user => user.USER_ID === subject.USER_ID)

            return ({
                ...subject,
                SCHED_ID: schedule ? schedule : null,
                USER_ID: user ? user : null,
            })
        })
    }

    // const getOngoingSubjects = (currentTime: string) => {
    //     return getSubjects().filter((subject) => {
    //         const schedule = subject.SCHED_ID as ISchedule

    //         //console.log("Subject COntext: ", schedule)

    //         const currentTimeFormat = dayjs(currentTime).format("HH:mm:ss")
    //         const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
    //         const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")

    //         const currentTimeVal = dayjs(`2001-01-01 ${currentTimeFormat}`)
    //         const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
    //         const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)

    //         return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === dayjs(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime))
    //     })
    // }

    const getOngoingSubjects = (subjects: Array<ISubject>, currentTime: string) => {
        return subjects.map((subject) => {
            const schedule = getSchedule(subject.SCHED_ID as string)
            return ({
                ...subject,
                SCHED_ID: schedule ? schedule : null
            })
        }).filter((subject) => {
            const schedule = subject.SCHED_ID as ISchedule

            //console.log("Subject COntext: ", schedule)

            const currentTimeFormat = dayjs(currentTime).format("HH:mm:ss")
            const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
            const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")

            const currentTimeVal = dayjs(`2001-01-01 ${currentTimeFormat}`)
            const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
            const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)

            return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === dayjs(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime))
        })
    }

    const getSubjectsBySchedule = (currTime: Dayjs) => {
        return subjects.filter(subject => subject.ROOM_ID !== null).filter(subject => {
            const initialStartDate = dayjs(getSchedule(subject.SCHED_ID as string)?.SCHED_STARTTIME)
            const initialEndDate = dayjs(getSchedule(subject.SCHED_ID as string)?.SCHED_ENDTIME)
    
            const currentTime = dayjs(`2001-01-01 ${currTime.hour()}:${currTime.minute()}`).toISOString()
            const subjectStartTime = dayjs(`2001-01-01 ${initialStartDate.hour()}:${initialStartDate.minute()}`).toISOString()
            const subjectEndTime = dayjs(`2001-01-01 ${initialEndDate.hour()}:${initialEndDate.minute()}`).toISOString()
    
            return currentTime > subjectStartTime && currentTime < subjectEndTime
        })
    }
    
    const getSubjectsByCurrentTime = () => {
        const currentTime = dayjs()

        // Check if the day today is one of the current weeks
        return getSubjects()
            .filter(subject => {
                //Get the week day number today
                const schedule = subject.SCHED_ID as ISchedule
                const currentWeekDay = weekDays.find(weekday => weekday.value === currentTime.day())?.label

                return schedule.SCHED_WEEKASSIGNED.includes(currentWeekDay!)
            }).filter(subject => {
                const schedule = subject.SCHED_ID as ISchedule
                
                const initialStartDate = dayjs(schedule?.SCHED_STARTTIME)
                const initialEndDate = dayjs(schedule?.SCHED_ENDTIME)
        
                const subjectStartTime = dayjs().hour(initialStartDate.hour()).minute(initialStartDate.minute()).second(0).millisecond(0)//dayjs(`2000-01-01 ${initialStartDate.hour()}:${initialStartDate.minute()}:${initialStartDate.second()}`)
                const subjectEndTime = currentTime.hour(initialEndDate.hour()).minute(initialEndDate.minute()).second(0).millisecond(0)//dayjs(`2000-01-01 ${initialEndDate.hour()}:${initialEndDate.minute()}:${initialEndDate.second()}`)

                return currentTime.isAfter(subjectStartTime, 'minutes') && currentTime.isBefore(subjectEndTime, 'minutes')//(currentTime > subjectStartTime && currentTime < subjectEndTime) //subject.ROOM_ID === roomId && 
            })
    }

    const subjectCollection = collection(db, '/Subject/').withConverter(converter<ISubject>())

    useEffect(() => {
        const fetchSubjectSnapshot = onSnapshot(subjectCollection, (snapshot) => {
            const scheduleDocs = snapshot.docs.map((subject):ISubject => {
                return({
                    SUB_ID: subject.id,
                    ...subject.data(),
                })
            })

            setSubjects(scheduleDocs)
            console.log("Subjects set")
        }, (error) => {
            console.error('Schedule Context Error', error)
        })

        return () => {
            fetchSubjectSnapshot()

            setLoad(false)
        }
    }, [user])

    const value = {
        subjects,
        load,
        setLoad,
        getOngoingSubjects,
        getSubjects,
        getSubjectsBySchedule,
        getSubjectsByCurrentTime,
    }

    return (
        <SubjectContext.Provider value={value}>
            { children }
        </SubjectContext.Provider>
    )
}