// import { CampusMapType } from "../../types/CampusType";
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";

type mapboxSourceTileType = {
    tilesetId: string;
    sourceLayer: string;
}

type layerTileType = {
    points: mapboxSourceTileType;
    route: mapboxSourceTileType;
    room: mapboxSourceTileType;
    roombase: mapboxSourceTileType;
    base: mapboxSourceTileType;
}

type MapBoxFloorDetailsType = {
    G: layerTileType;
    B: layerTileType;
}

type FloorDetailsType = {
    id: number;
    name: string;
    points: DefaultSourceLayerType;
    routes: DefaultSourceLayerType;
    rooms: DefaultSourceLayerType;
    roombase: DefaultSourceLayerType;
    base: DefaultSourceLayerType;
}

export const MapBoxFloorDetails: MapBoxFloorDetailsType = {
    // 9: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 8: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 7: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 6: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 5: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 4: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 3: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // 2: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    // M: {
    //     points: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     route: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     room: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     roombase: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    //     base: {
    //         tilesetId: null,
    //         sourceLayer: null,
    //     },
    // },
    G: {
        points: {
            tilesetId: 'amarilloshinlee.ciq0wovv',
            sourceLayer: 'Groundfloor_pathpoints-65lp5t',
        },
        route: {
            tilesetId: 'amarilloshinlee.9kabg1ib',
            sourceLayer: 'Groundfloor_route-2vvr0w',
        },
        room: {
            tilesetId: 'amarilloshinlee.1pd11jpd',
            sourceLayer: 'Groundfloor_rooms-2vl1xb',
        },
        roombase: {
            tilesetId: 'amarilloshinlee.dzy9pvar',
            sourceLayer: 'Groundfloor_roombase-bgrglw',
        },
        base: {
            tilesetId: 'amarilloshinlee.7zo227np',
            sourceLayer: 'Groundfloor_base-ancfso',
        },
    },
    B: { //TO-DO: Change or make tileset and sourcelater
        points: {
            tilesetId: 'amarilloshinlee.4n421o7c',
            sourceLayer: 'Basefloor_pathpoints-2ef0uc',
        },
        route: {
            tilesetId: 'amarilloshinlee.ajygnwin',
            sourceLayer: 'Basefloor_routes-9z0btb',
        },  
        room: {
            tilesetId: 'amarilloshinlee.2qegyzfq',
            sourceLayer: 'Basement_rooms-cin35l',
        },
        roombase: {
            tilesetId: 'amarilloshinlee.9jhwhbwg',
            sourceLayer: 'Basement_roombase-893s6y',
        },
        base: {
            tilesetId: 'amarilloshinlee.2lipcj9j',
            sourceLayer: 'Basement_base-4vbip0',
        },
    }
}

//Floor Object <- Needs to be an Array
    //Floor Id
    //Floor Name
    //Kiosk Source
    //Route Source
    //Room Source
    //Roombase Source
    //Base Source

const floorDetails = (id: number, name: string, symbol: "B" | "G"): FloorDetailsType => {
    return ({
        id: id,
        name: name,
        points: {
            type: "points",
            floor: name.toLowerCase(),
            sourceId: `${name.toLowerCase()}_point_source`,
            layerId: `${name.toLowerCase()}_point_layer`,
            tilesetId: MapBoxFloorDetails[symbol].points.tilesetId,
            sourceLayer: MapBoxFloorDetails[symbol].points.sourceLayer,
            // paint: {
            //     "circle-color": "#5da8dd",
            //     "circle-radius": 4,
            // },
            style: {
                circleColor: "#F30",
                circleRadius: 4
            },
            beforeLayer: symbol === "B" ? 'ground_base_layer' : undefined,
        },
        routes: {
            type: "routes",
            floor: name.toLowerCase(),
            sourceId: `${name.toLowerCase()}_path_source`,
            layerId: `${name.toLowerCase()}_path_layer`,
            tilesetId: MapBoxFloorDetails[symbol].route.tilesetId,
            sourceLayer: MapBoxFloorDetails[symbol].route.sourceLayer,
            // paint: {
            //     "line-color": "#000000",
            //     "line-width": 2,
            // },
            style: {
                lineColor: "#000000",
                lineWidth: 2
            },
            beforeLayer: `${name.toLowerCase()}_point_layer`,
            //beforeLayer: symbol === "B" ? 'ground_base_layer' : undefined,
        },
        rooms: {
            type: "room",
            floor: name.toLowerCase(),
            sourceId: `${name.toLowerCase()}_rooms_source`,
            layerId: `${name.toLowerCase()}_rooms_layer`,
            tilesetId: MapBoxFloorDetails[symbol].room.tilesetId,
            sourceLayer: MapBoxFloorDetails[symbol].room.sourceLayer,
            // paint: {
            //     "fill-color": "#f2f2f2",
            //     "fill-outline-color": "#bfbfbf",
            // },
            style: {
                fillColor: "#f2f2f2",
                fillOutlineColor: "#bfbfbf",
            },
            beforeLayer: `${name.toLowerCase()}_path_layer`,
        },
        roombase: {
            type: "roombase",
            floor: name.toLowerCase(),
            sourceId: `${name.toLowerCase()}_roombase_source`,
            layerId: `${name.toLowerCase()}_roombase_layer`,
            tilesetId: MapBoxFloorDetails[symbol].roombase.tilesetId,
            sourceLayer: MapBoxFloorDetails[symbol].roombase.sourceLayer,
            // paint: {
            //     "fill-color": "#ababab",
            // },
            style: {
                fillColor: "#ababab"
            },
            beforeLayer: `${name.toLowerCase()}_rooms_layer`,
        },
        base: {
            type: "base",
            floor: name.toLowerCase(),
            sourceId: `${name.toLowerCase()}_base_source`,
            layerId: `${name.toLowerCase()}_base_layer`,
            tilesetId: MapBoxFloorDetails[symbol].base.tilesetId,
            sourceLayer: MapBoxFloorDetails[symbol].base.sourceLayer,
            // paint: {
            //     "fill-color": "#fcfcfc",
            // },
            style: {
                fillColor: "#fcfcfc"
            },
            beforeLayer: `${name.toLowerCase()}_roombase_layer`,
        },
    })
}

export const Floors: Array<FloorDetailsType> = [
    // floorDetails(10, 'Ninth', '9', selectedFloor === '9'),
    // floorDetails(9, 'Eighthth', '8', selectedFloor === '8'),
    // floorDetails(8, 'Seventh', '7', selectedFloor === '7'),
    // floorDetails(7, 'Sixth', '6', selectedFloor === '6'),
    // floorDetails(6, 'Fifth', '5', selectedFloor === '5'),
    // floorDetails(5, 'Fourth', '4', selectedFloor === '4'),
    // floorDetails(4, 'Third', '3', selectedFloor === '3'),
    // floorDetails(3, 'Second', '2', selectedFloor === '2'),
    // floorDetails(2, 'Mezzanine', 'M', selectedFloor === 'M'),
    floorDetails(1, 'Ground', 'G'),
    floorDetails(0, 'Basement', 'B'),
]