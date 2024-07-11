import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import encoredRoleServices from "../../api/encored-role-services";

interface RoleState {
    loading: boolean,
    data: any | undefined,
    error: any
}

const initialState: RoleState = {
    loading: false,
    data: {},
    error: null
}

export const getRole = createAsyncThunk(
    "role/get",
    async (email: string, {rejectWithValue}) => {
        return await encoredRoleServices.getAssigned(email)
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        logOutRole: (state) => {
            state.data = []
        }
    },
    extraReducers: builder => {
        //Get Role
        {
            builder.addCase(getRole.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getRole.fulfilled, (state, actions: PayloadAction<any>) => {
                console.log("Role Action", actions.payload)
                state.loading = false
                state.data = actions.payload
                state.error = null
            })
            builder.addCase(getRole.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.data = {}
                state.error = actions.payload.code
            })
        }
    }
})

export const { logOutRole } = roleSlice.actions

export default roleSlice.reducer