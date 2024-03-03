import { DefaultSourceLayerType, SelectedRoomLayerType } from "../../types/DefaultSourceLayerType"
import { FillLayer, VectorSource } from "@rnmapbox/maps"
import { FillLayerStyleProps } from "@rnmapbox/maps/src/utils/MapboxStyles"

export const DefaultFillSourceLayer = ({
    type,

    sourceId,
    tilesetId,
    layerId,
    sourceLayer,

    style,

    beforeLayer,
    filter,

    name,
    roomFilter,
}: DefaultSourceLayerType & SelectedRoomLayerType) => {
    
    return (
        <VectorSource
        id={sourceId}
        url={`mapbox://${tilesetId}`}>
            <>
                {/* {type === "room" ? 
                    <FillLayer
                    id={`${name?.toLowerCase()}_roomFilter_layer`}
                    sourceID={sourceId}
                    sourceLayerID={sourceLayer}

                    //filter={['all', roomFilter!, filter]} //Filter based on the selected room

                    // layout={{
                    //     visibility: "visible"
                    // }}
                    // paint={{
                    //     "fill-color": '#57adea',
                    //     "fill-outline-color": "#1e75b3"
                    // }}
                    style={style}/>
                : undefined} */}

                <FillLayer
                id={layerId}
                sourceID={sourceId}
                sourceLayerID={sourceLayer}
                // source-layer={sourceLayer}
                belowLayerID={beforeLayer}

                filter={filter} //Filter based on the selected room
                
                style={style}
                />
            </>
        </VectorSource>
    )
}

//       <VectorSource
//       onPress={floor === 'M' && onPress}
//       id='mezzanine_roombase_vs'
//       url='mapbox://amarilloshinlee.4a5uuxfs'>
//         <FillLayer
//         id='mezzanine_roombase_fl'
//         sourceID='mezzanine_roombase_vs'
//         sourceLayerID='Mezzanine_roombase-2l39tx'
//         aboveLayerID='mezzanine_base_fl'
//         style={{
//           visibility: floor === 'M' ? 'visible' : 'none',
//           fillColor: "#0668ae"
//         }}
//         />
//       </VectorSource>