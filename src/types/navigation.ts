// A File that contains Aliases and Interfaces of navigation

export type AuthStackParamList = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined; //Needs parameters because authentication!
}

export interface RootStackParamList extends AuthStackParamList {}

// Global navigation
declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}