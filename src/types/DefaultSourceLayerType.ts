import { FillLayerStyleProps, LineLayerStyleProps, CircleLayerStyleProps, SymbolLayerStyleProps } from "@rnmapbox/maps/src/utils/MapboxStyles"
import { FixMeLater } from "./FixMeLater";
import { VectorSource } from "@rnmapbox/maps";

export type DefaultSourceLayerType = {
    floor?: string | undefined;
    type: "room" | "roombase" | "base" | "points" | "routes";
    sourceId: string;
    tilesetId: string;
    layerId: string;
    sourceLayer: string;
    
    beforeLayer?: string;

    style?: FillLayerStyleProps | LineLayerStyleProps | CircleLayerStyleProps | SymbolLayerStyleProps;
    
    testRef?: FixMeLater;

    filter?: Array<any>;
}

export type SelectedRoomLayerType = {
    name?: string;
    roomFilter?: Array<any>;
}