import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import EncoredInstitutionService from "../../api/encored-institution-service";
import { InstitutionType } from "../../../types/output";

interface InsititutionState {
    loading: boolean,
    data: InstitutionType | undefined,
    error: any
}

const initialState: InsititutionState = {
    loading: false,
    data: undefined,
    error: null
}


export const getInstitution = createAsyncThunk(
    "insititution/get",
    async (email: string, {rejectWithValue}) => {
        return await EncoredInstitutionService.get(email)
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)


const institutionSlice = createSlice({
    name: 'institution',
    initialState,
    reducers: {
        logOutInsitution: (state) => {
            state.data = undefined
        }
    },
    extraReducers: builder => {
        //Get Institution
        {
            builder.addCase(getInstitution.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getInstitution.fulfilled, (state, actions: PayloadAction<any>) => { 
                state.loading = false
                state.data = actions.payload
                state.error = null
            })
            builder.addCase(getInstitution.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.data = undefined
                state.error = actions.payload.code
            })
        }
    }
})

export const { logOutInsitution } = institutionSlice.actions

export default institutionSlice.reducer