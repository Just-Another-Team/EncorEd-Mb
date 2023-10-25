import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import institutionSlice from "./features/institution/institutionSlice";
import roleSlice from "./features/role/roleSlice";

/* - - - - - Redux flipper - - - - */
const middleware: any = []

if (__DEV__) { 
    const createDebugger = require('redux-flipper').default;
    middleware.push(createDebugger())
}
/* - - - - - - - - - - - - - - - - */

/* - - - - - Redux Persist Configurations - - - - - */
const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const userConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: ['loading', 'error']
}

const insititutionConfig = {
    key: 'institution',
    storage: AsyncStorage,
    blacklist: ['loading', 'error']
}

const roleConfig = {
    key: 'role',
    storage: AsyncStorage,
    blacklist: ['loading', 'error']
}
/* - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - Combined Reducers - - - - - */
const combinedReducers = combineReducers({
    authentication: persistReducer(userConfig, authSlice),
    institution: persistReducer(insititutionConfig, institutionSlice),
    role: persistReducer(roleConfig, roleSlice)
})

const persistedCombinedReducers = persistReducer(rootConfig, combinedReducers)
/* - - - - - - - - - - - - - - - - - - - */

const store = configureStore({
    reducer: persistedCombinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    }).concat(middleware)
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store