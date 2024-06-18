// A File that contains Aliases and Interfaces of navigation

import { RoomType } from "../data/roomData";
import AttendanceDataType from "./AttendanceDataType";
import IAttendance from "./IAttendance";


export type AuthStackParamList = {
    Login: undefined;
    Dashboard: undefined;

    Notifications: undefined;
    OngoingSubjects: undefined;
    RecentAttendances: undefined;
    AttendanceForm: RoomType;
    AttendanceReceipt: IAttendance;
    
    //Debug Screens
    // QR: undefined;
    // Charts: undefined;
    // UI: undefined;
    // LinkPage: AttendanceDataType;
}


export type DashboardStackParamList = {
    Home: undefined;
    QR: undefined;
    Profile: undefined
}

export interface RootStackParamList extends AuthStackParamList, DashboardStackParamList {}

// Global navigation
declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}