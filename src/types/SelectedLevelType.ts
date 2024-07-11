import { IsValid } from "./IsValid";

export type SelectedLevelType = {
    symbol: number;
    levelKey: string;
}

export type RoomReportType = {
    description?: string;
    roomName: string;
    dateDescription: string;
    submittedBy: string;
    valid: IsValid
}