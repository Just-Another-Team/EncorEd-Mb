// A File that contains Aliases and Interfaces of navigation

import AttendanceDataType from "./AttendanceDataType";


export type AuthStackParamList = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
    LoggedIn: undefined; //Needs parameters because Authentication
    EditProfile: undefined;
    Notifications: undefined;
    Room: undefined;
    Attendance: undefined;
    // Profile: undefined;
    // Dashboard: undefined; //Needs parameters because authentication!

    //Debug Screens
    QR: undefined;
    Charts: undefined;
    UI: undefined;
    LinkPage: AttendanceDataType;
}

export type DrawerStackParamList = {
    Dashboard: undefined;
    Profile: undefined;
}

export type DashboardStackParamList = {
    Home: undefined;
    Subject: undefined;
    Map: undefined;
    Event: undefined;
    Group: undefined;
    SelectedItem: undefined;
}

export interface RootStackParamList extends AuthStackParamList, DrawerStackParamList, DashboardStackParamList {}

// Global navigation
declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}