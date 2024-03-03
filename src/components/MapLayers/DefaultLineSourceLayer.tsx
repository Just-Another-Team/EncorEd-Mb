import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType"
import { LineLayer, VectorSource } from "@rnmapbox/maps"

export const DefaultLineSourceLayer = ({
    sourceId,
    tilesetId,
    layerId,
    sourceLayer,
    beforeLayer,
    filter,
    style
}: DefaultSourceLayerType) => {
    return (
        <VectorSource
        id={sourceId}
        url={`mapbox://${tilesetId}`}>
            {/* <LineLayer
            id={`${layerId}_filter`}
            sourceID={sourceId}
            sourceLayerID={sourceLayer}
            //filter={['in', 'id', 10000, 10001, 10002]} //filter indoor route here
            filter={filter} //Filter when Navigate is activated
            belowLayerID={beforeLayer}
            // layout={{
            //     visibility: "visible",
            //     "line-cap": "round",
            //     "line-join": "round"
            // }}
            // paint={{
            //     "line-color": "#0d81d3",
            //     "line-width": 4,
            // }}
            style={style}/> */}

            <LineLayer
            id={layerId}
            sourceID={sourceId}
            sourceLayerID={sourceLayer}
            // source-layer={sourceLayer}
            style={style}
            filter={filter}
            belowLayerID={beforeLayer}
            />
        </VectorSource>
    )
}