import { CircleLayer, SymbolLayer, VectorSource } from "@rnmapbox/maps"
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType"
import { useEffect, useRef } from "react";

export const DefaulPointSourceLayer = ({
    sourceId,
    tilesetId,
    layerId,
    sourceLayer,
    beforeLayer,
    style,
    filter,
    testRef
}: DefaultSourceLayerType) => {
    return (
        <VectorSource
        id={sourceId}
        ref={testRef}
        url={`mapbox://${tilesetId}`}>
            <CircleLayer
            id={layerId}
            sourceID={sourceId}
            sourceLayerID={sourceLayer}
            //filter={["in", "id", 2201001]} //Filter only the kiosk
            filter={filter}
            // beforeId={beforeLayer}
            belowLayerID={beforeLayer}
            style={style}/>
        </VectorSource>
    )
}