import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectedLevelType } from "../../../types/SelectedLevelType";

type InitialStateType = {
    selectedLevel: SelectedLevelType;
}

const initialState: InitialStateType = {
    selectedLevel: {
        symbol: 0,
        levelKey: "Ground"
    },
}

const levelSlice = createSlice({
    name: 'level',
    initialState,
    reducers: {
        selectLevel(state, action: PayloadAction<SelectedLevelType>) {
            state.selectedLevel = action.payload
        },
        //getFeatures
    },
})

export const { selectLevel } = levelSlice.actions;
export default levelSlice.reducer;