import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../api/encored-auth-service"
import { Credentials } from "../../../types/input";
import { UserCredential } from "firebase/auth";
import { UserType } from "../../../types/output";

interface UserState {
    loading: boolean,
    user: UserType | undefined,
    error: any
}

type UserData = { //This is from register
    firstName: boolean;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}

const initialState: UserState = {
    loading: false,
    user: undefined,
    error: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (userData: Credentials, {rejectWithValue}) => {
        return await EncorEdAuthService.signIn(userData).catch(error => rejectWithValue(error))
    }
)

export const logOutUser = createAsyncThunk(
    "user/signOut",
    async (_, {rejectWithValue}) => {
        return await EncorEdAuthService.signOut().catch(error => rejectWithValue(error));
    }
)

export const getUser = createAsyncThunk(
    "user/get",
    async (email: string, {rejectWithValue}) => {
        return await EncorEdAuthService.get(email)
            .catch((error) => rejectWithValue(error))
    }
)

export const updateUser = createAsyncThunk(
    "user/update",
    async (data: any, {rejectWithValue}) => {
        return await EncorEdAuthService.updateUser(data)
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, actions: PayloadAction<UserType>) => {
            state.loading = false
            state.user = actions.payload
            state.error = null
        },
        resetUser: (state) => {
            state.loading = false
            state.user = undefined
            state.error = null
        }
    },
    extraReducers: builder => {
        //Signing In
        {
            builder.addCase(signIn.pending, (state) => {
                state.loading = true
            })
            builder.addCase(signIn.fulfilled, (state, actions: PayloadAction<UserCredential>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(signIn.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Signing out
        {
            builder.addCase(logOutUser.pending, (state, actions: PayloadAction<any>) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(logOutUser.fulfilled, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.user = undefined
                state.error = null
            })
            builder.addCase(logOutUser.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Get User
        {
            builder.addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getUser.fulfilled, (state, actions: PayloadAction<any>) => { 
                state.loading = false
                // state.user = actions.payload
                state.error = null
            })
            builder.addCase(getUser.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.user = undefined
                state.error = actions.payload.code
            })
        }

        //Update User
        {
            builder.addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(updateUser.fulfilled, (state, actions: PayloadAction<any>) => { 
                state.loading = false
                state.user = actions.payload
                state.error = null
            })
            builder.addCase(updateUser.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.user = undefined
                state.error = actions.payload.code
            })
        }
    }
})

// export const { setCredentials, logOut } = authSlice.actions

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn
export const { resetUser, logIn } = authSlice.actions
export default authSlice.reducer