import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./DashboardStack";
import AttendanceForm from "../pages/AttendanceForm";
import AttendanceReceipt from "../pages/AttendanceForm/AttedanceReceipt";
import Color from "../assets/styles/Color";
import Attendance from "../pages/Attendance";
import Subject from "../pages/Subject";
import Notifications from "../pages/Notification";
import { useEffect } from "react";
import messaging from '@react-native-firebase/messaging'
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useUsers } from "../hooks/useUsers";
import useDepartment from "../hooks/useDepartment";

const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    const { user } = useAuth();
    const { addFCMToken } = useUsers();

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }

    const requestNotificationPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result;
    };

    const checkNotificationPermission = async () => {
        const checkPermission = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        return checkPermission
    }

    const onAppBootstrap = async () => {
        let token = ""

        const checkPermission = await checkNotificationPermission()
        if (checkPermission === RESULTS.GRANTED) {
            token = await messaging().getToken()
        } 

        const request = await requestNotificationPermission();

        if (request === RESULTS.GRANTED) {
            await messaging().registerDeviceForRemoteMessages();
            token = await messaging().getToken()
        }

        addFCMToken(token)
            .then((result) => {
                console.log(result.data)
            })
            .catch(error => {
                console.error("Add FCM Token Error: ", error.data)
            })

        //const departmentTopic = `ENCORED_${}_CURRENT_SUBJECTS`

        // ENCORED_CCS_CURRENT_SUBJECTS
        // ENCORED_CT_CURRENT_SUBJECTS

        // messaging().subscribeToTopic('ENCORED_CURRENT_SUBJECTS')
        //     .then(() => {
        //         console.log("Topic added!")
        //     })
    }

    useEffect(() => {
        if (!user) return

        onAppBootstrap()
    }, [user])

    return(
        <Stack.Navigator
        screenOptions={{
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#F9F9FF',
            headerStyle: { backgroundColor: "#45A1FD" },
            contentStyle: { backgroundColor: Color('white', 400) as string },
        }}
        initialRouteName='Login'
        //initialRouteName="AttendanceReceipt"
        >
            {
                user ?
                <Stack.Screen
                options={{ headerShown: false }}
                name="Dashboard"
                component={UserStack}/> :
                <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}/>
            }
            
            <Stack.Screen
            options={{ headerTitle: "Submit Attendance" }}
            name="AttendanceForm"
            component={AttendanceForm}/>

            <Stack.Screen
            options={{ headerTitle: "Verify Attendance" }}
            name="AttendanceReceipt"
            component={AttendanceReceipt}/>

            <Stack.Screen
            options={{ headerTitle: "Recent Attendances" }}
            name="RecentAttendances"
            component={Attendance}/>

            <Stack.Screen
            options={{ headerTitle: "Ongoing Subjects" }}
            name="OngoingSubjects"
            component={Subject}/>

            <Stack.Screen
            options={{ headerTitle: "Notifications" }}
            name="Notifications"
            component={Notifications}/>
        </Stack.Navigator>
    )
}

export default AuthStack