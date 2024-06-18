import { initializeApp, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, onSnapshot, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase App
const firebaseConfig = {
    apiKey: "AIzaSyBoKPIYalfZbmEQ22-l9yLmloSHRmXf5Z0",
    authDomain: "encored-bd6f8.firebaseapp.com",
    projectId: "encored-bd6f8",
    storageBucket: "encored-bd6f8.appspot.com",
    messagingSenderId: "408443509099",
    appId: "1:408443509099:web:4c1e39503588ce85f0942e",
    measurementId: "G-6KWCCF6EZL"
};

// Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig)

// Firebase Authorization
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

// Firebase Firestore
const db = getFirestore(FIREBASE_APP)

const storage = getStorage(FIREBASE_APP, 'gs://encored-bd6f8.appspot.com')
// Firebase Cloud Messaging
// export const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();

//     const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

//     if (enabled) console.log('Authorization Status: ', authStatus) 
// }

// const GetFCMToken = async () => {
//     let fcmToken = await AsyncStorage.getItem("fcmToken");

//     console.log("Old Token: ", fcmToken)

//     if (!fcmToken) {

//         try {
//             const fcmToken = await messaging().getToken()

//             if (fcmToken) {
//                 console.log("New Token: ", fcmToken)
//                 await AsyncStorage.setItem("fcmToken", fcmToken);
//             }
//         }
//         catch (error) {
//             console.error("Error in FcmToken: ", error)
//         }

//     }
// }

export { FIREBASE_APP, FIREBASE_AUTH, getApp, getAuth, storage, db, onSnapshot }