import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FixMeLater } from "../../../types/FixMeLater";
import EncoredAttendanceService from "../../api/attendance-service";

type AttendanceStateType = {
    loading: boolean,
    data: Array<FixMeLater>,
    error: any
}

const initialState: AttendanceStateType = {
    loading: false,
    data: [],
    error: null
}

export const submitAttendance = createAsyncThunk(
    "attendance/submit",
    async (data: FixMeLater, {rejectWithValue}) => {
        return await EncoredAttendanceService.addAttendance(data).catch(error => rejectWithValue(error))
    }
)

export const validateAttendance = createAsyncThunk(
    "attendance/validate",
    async (data: FixMeLater, {rejectWithValue}) => {
        return await EncoredAttendanceService.validateAttendance(data).catch(error => rejectWithValue(error));
    }
)

export const getAttendances = createAsyncThunk(
    "attendance/get/all",
    async (institution: string, {rejectWithValue}) => {
        return await EncoredAttendanceService.showAttendances(institution).catch(error => rejectWithValue(error));
    }
)

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: builder => {
        //submitAttendance
        {
            builder.addCase(submitAttendance.pending, (state) => {
                state.loading = true
            })
            builder.addCase(submitAttendance.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(submitAttendance.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //validateAttendance
        {
            builder.addCase(validateAttendance.pending, (state) => {
                state.loading = true
            })
            builder.addCase(validateAttendance.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(validateAttendance.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Get
        {
            builder.addCase(getAttendances.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getAttendances.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = actions.payload.data;
                state.error = null
            })
            builder.addCase(getAttendances.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
});

//export const { selectRoom, getMap, getRooms, resetRoutes } = attendanceSlice.actions;
export default attendanceSlice.reducer;