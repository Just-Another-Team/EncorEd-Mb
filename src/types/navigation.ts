// A File that contains Aliases and Interfaces of navigation

export type AuthStackParamList = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
    LoggedIn: undefined; //Needs parameters because Authentication
    // Profile: undefined;
    // Dashboard: undefined; //Needs parameters because authentication!
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
}

export interface RootStackParamList extends AuthStackParamList, DrawerStackParamList, DashboardStackParamList {}

// Global navigation
declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}