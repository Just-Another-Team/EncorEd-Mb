import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EncoredNavigationService from "../../api/encored-navigation-service";
import { AxiosResponse } from "axios";
import { FixMeLater } from "../../../types/FixMeLater";
import { GraphDataType, LooseObject } from "../../../types/GraphDataType";
import { RoomOptionType, RoomType } from "../../../types/RoomType";
import { MapView } from "@rnmapbox/maps"

export type PathDataType = {
    origin?: number;
    destination?: number;
    routes?: Array<number>;
}

type InitialNavType = {
    loading?: boolean;
    map?: MapView | FixMeLater, //MapType that I do not know how
    data?: FixMeLater,
    
    graph?: LooseObject;
    edges?: Array<{id: number, points: Array<number>}>;
    routes?: Array<number>;

    rooms?: Array<RoomOptionType>;
    selectedRoom?: RoomType; 
    error?: any;
}

export const initializeGraph = createAsyncThunk(
    "navigation/initialize",
    async (graphData: GraphDataType & PathDataType, {rejectWithValue}) => await EncoredNavigationService.initializeGraph(graphData).catch(error => rejectWithValue(error))
)

export const generatePath = createAsyncThunk(
    "navigation/generatePath",
    async (graphData: GraphDataType, {rejectWithValue}) => await EncoredNavigationService.generatePath(graphData).catch(error => rejectWithValue(error))
)

const initialState: InitialNavType = {
    loading: false,
    map: {},
    data: {},
    
    graph: {},
    edges: [],
    routes: [],

    rooms: [],
    selectedRoom: {},
    error: null
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        getMap: (state, actions: PayloadAction<FixMeLater>) => {
            state.map = actions.payload
        },
        selectRoom: (state, actions: PayloadAction<RoomType>) => {
            state.selectedRoom = actions.payload;
        },
        getRooms: (state, actions: PayloadAction<Array<RoomOptionType>>) => {
            state.rooms = actions.payload
        },
        resetRoutes: (state) => { state.routes = [] }
    },
    extraReducers: builder => {
        builder.addCase(initializeGraph.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(initializeGraph.fulfilled, (state, actions: PayloadAction<AxiosResponse<GraphDataType>>) => {
            state.loading = false;
            // state.data = actions.payload.data;
            state.graph = (actions.payload.data as GraphDataType).graph
            state.edges = (actions.payload.data as GraphDataType).edges
            state.error = null;
        })
        builder.addCase(initializeGraph.rejected, (state, actions: PayloadAction<FixMeLater>) => {
            state.loading = false;
            state.error = actions.payload.data;
        })

        builder.addCase(generatePath.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(generatePath.fulfilled, (state, actions: PayloadAction<AxiosResponse<FixMeLater>>) => {
            state.loading = false;
            // state.data = actions.payload.data as PathDataType;
            state.routes = (actions.payload.data as PathDataType).routes
            state.error = null;
        })
        builder.addCase(generatePath.rejected, (state, actions: PayloadAction<FixMeLater>) => {
            state.loading = false;
            state.error = actions.payload.data;
        })
    }
})

export const { selectRoom, getMap, getRooms, resetRoutes } = navigationSlice.actions;
export default navigationSlice.reducer;