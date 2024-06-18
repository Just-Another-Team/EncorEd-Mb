/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import { navigationRef } from './src/routes/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store, { persistor } from './src/app/encored-store';
import { PersistGate } from 'redux-persist/integration/react';
import { Alert, Linking, LogBox } from 'react-native'
import { Theme } from './src/assets/styles/theme';
import { config } from './src/types/screenConfig';
import AuthStack from './src/routes/AuthStack';
import { AuthProvider } from './src/context/AuthContext';
import { AttendanceProvider } from './src/context/AttendanceContext';
import { SubjectProvider } from './src/context/SubjectContext';
import { RoomProvider } from './src/context/RoomContext';
import { ClockProvider } from './src/context/ClockContext';
import { DepartmentProvider } from './src/context/DepartmentContext';
import { UserProvider } from './src/context/UserContext';
import ScheduleProvider from './src/context/ScheduleContext';
import messaging from '@react-native-firebase/messaging'
import IndexRoute from './src/routes/index'

// Background notifications here from Notifee
// - if device is locked, application is running but not in view, or application is killed
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const { notification, pressAction } = detail
//   //create trigger
//   console.log(pressAction)
// });

//Changed. Keep watch on this
LogBox.ignoreLogs(['Warning: ....']);
LogBox.ignoreAllLogs();

function App(): JSX.Element {

  // Foreground notification
  // - If device is unlocked and the app is running
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage))
  //   });

  //   return unsubscribe
  // }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AuthProvider>
          <DepartmentProvider>
            <UserProvider>
              <ScheduleProvider>
                <RoomProvider>
                  <SubjectProvider>
                    <AttendanceProvider>
                      <ClockProvider>
                        <PaperProvider theme={Theme}>
                          <GestureHandlerRootView style={{flex: 1}}>
                            <IndexRoute />
                          </GestureHandlerRootView>
                        </PaperProvider>
                      </ClockProvider>
                    </AttendanceProvider>
                  </SubjectProvider>
                </RoomProvider>
              </ScheduleProvider>
            </UserProvider>
          </DepartmentProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
