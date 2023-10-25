import app from "./config"
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken,
    onAuthStateChanged,
    signOut
} from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

const auth = getAuth(app)

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken,
    signOut,
    onAuthStateChanged
}