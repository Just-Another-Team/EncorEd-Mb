import { EdgeType } from "./EdgeType";
import { VertexType } from "./VertexType";

export interface LooseObject {
    [key: number | string]: any;
}

export type GraphDataType = {
    vertices?: Array<VertexType>
    edges?: Array<EdgeType>
    graph?: Array<LooseObject> | LooseObject
}