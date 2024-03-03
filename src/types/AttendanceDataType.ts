type AttendanceDataType = {
    roomNumber: string | number | null;
    edpCode: string | number | null;
    instructor: string | null;
    startSchedule: Date | string;
    endSchedule: Date | string;

    comments?: string | null;
    status?: string | null;
    dateScanned?: Date | string | null;
    dateSubmitted?: Date | string | null;
}

export default AttendanceDataType