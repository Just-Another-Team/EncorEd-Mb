export default interface IAttendance {
    id?: string;
    institution?: string;
    roomName: string;
    submitBy: string;
    submitAt: Date | string;
    verifyBy?: string | null;
    verifyAt?: Date | string | null;
    description?: string;
    status:  string;
}

export type AttendanceType = IAttendance