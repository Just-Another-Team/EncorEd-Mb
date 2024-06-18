import { useEffect, useState } from "react";
import roomService from "../app/api/room-service";
import IRoom from "../types/IRoom";
import ISubject from "../types/ISubject";
import subjectService from "../app/api/subject-service";
import dayjs from "dayjs";

export const useScannedAttendance = () => {
    const [rooms, setRooms] = useState<Array<IRoom>>([]);
    const [subjects, setSubjects] = useState<Array<ISubject>>([]);

    const [loading, setLoading] = useState<boolean>(true);
    
    // const getSubjectByRoom = (roomId: string) => {
    //     return subjects.filter(subject => subject.)
    // }

    useEffect(() => {
        const fetchedScannedAttendance = async () => {
            const room = await roomService.view()
            const subject = await subjectService.viewBySchedule(dayjs().toISOString());

            setRooms(room.data)
            setSubjects(subject.data)

            setLoading(false)
        }

        fetchedScannedAttendance();
    }, [])

    return { rooms, subjects, loading }
}