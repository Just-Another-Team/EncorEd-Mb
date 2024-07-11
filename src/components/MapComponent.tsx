import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
} from 'react-native';
import MapboxGL, {
  MapView,
  Camera,
  BackgroundLayer,
  VectorSource,
} from "@rnmapbox/maps"
import { CampusMapProps } from '../types/componentProps';
import { FixMeLater } from '../types/FixMeLater';
import { Floors } from './MapLevelData/MapLayers';
import { DefaultFillSourceLayer } from './MapLayers/DefaultFillSourceLayer';
import { DefaultLineSourceLayer } from './MapLayers/DefaultLineSourceLayer';
import { DefaulPointSourceLayer } from "./MapLayers/DefaultPointSourceLayer"
import { useAppDispatch, useAppSelector } from '../app/encored-redux-hooks';
import { getMap } from '../app/features/navigation/navigationSlice';

MapboxGL.setAccessToken("pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA")

const CampusMap = ({centerCoordinate, zoom, filter, onPress, floor}: CampusMapProps) => {
  const navigationSelector = useAppSelector(state => state.navigation)
  const navigationDispatch = useAppDispatch();

  const map = useRef<VectorSource>(null)

  const handleMapLoad = () => {
    navigationDispatch(getMap(map))

    console.log("HELLO!? <-")
    if (map.current) {
      // map.current.queryRenderedFeaturesInRect([300, 300, 300, 300], []).then((result) => {
      //   result?.features.map((feature) => {
      //     console.log(feature.properties)
      //   })
      // }).catch((e) => { console.log(e) })
      const arr: FixMeLater[] = ['basement_point_layer', 'ground_point_layer'];

      map.current.features([] as never[], []).then((result: FixMeLater) => {
        console.log("Result: ", result)
      }).catch((e: FixMeLater) => console.error(e))
    }
  }

  useEffect(() => {
    if (map.current) {
      // map.current.queryRenderedFeaturesInRect([300, 300, 300, 300], []).then((result) => {
      //   result?.features.map((feature) => {
      //     console.log(feature.properties)
      //   })
      // }).catch((e) => { console.log(e) })
      const arr: FixMeLater[] = ['basement_point_layer', 'ground_point_layer'];

      map.current.features(arr as never[]).then((result: FixMeLater) => {
        console.log("Result: ", result)
      }).catch((e: FixMeLater) => console.error(e))
    }

    //TO-DO: Get all of the damn features
  }, [])

  return(
    <MapView
    onPress={onPress}
    onDidFinishLoadingMap={handleMapLoad}
    styleURL='mapbox://styles/amarilloshinlee/clqoecjrx00b001po715sho0g'
    //ref={map} //You can set the map here... maybe
    style={styles.map}>

      <Camera
      maxBounds={{
        ne: [123.912540, 10.339140],
        sw: [123.911470, 10.337970]
      }}
      maxZoomLevel={22}
      minZoomLevel={19}
      zoomLevel={zoom}
      centerCoordinate={centerCoordinate}
      /> 

      {Floors.map((el, ind) => {
        return (
            <>
                <DefaulPointSourceLayer
                type={el.points.type}
                // key={ind}
                testRef={map}
                sourceId={el.points.sourceId}
                tilesetId={el.points.tilesetId}
                layerId={el.points.layerId}
                sourceLayer={el.points.sourceLayer}
                beforeLayer={el.points.beforeLayer}
                //beforeLayer={`${el.name.toLowerCase()}_roomFilter_layer`}
                // layout={{
                //     visibility: "visible",
                //     "icon-image": "kiosk"
                // }}
                // style={{
                //   visibility: "visible",
                // }}
                filter={['all', ["in", "point_level", floor]]} //['in', 'id', ...routes]
                />

                <DefaultLineSourceLayer
                type={el.routes.type}
                // key={ind}
                sourceId={el.routes.sourceId}
                tilesetId={el.routes.tilesetId}
                layerId={el.routes.layerId}
                sourceLayer={el.routes.sourceLayer}
                beforeLayer={el.routes.beforeLayer}
                //filter={['in', 'id', '']}
                //filter={['all', ['in', 'id', ...routes], ["in", "route_level", prop.selectedFloor]]} //['in', 'id', ...routes] //["in", "route_level", prop.selectedFloor]
                filter={['all', ["in", "route_level", floor]]}
                //filter={['all', ['in', 'id', ...navigationSelector.routes!], ["in", "route_level", prop.selectedFloor]]}
                style={el.routes.style}/>

                <DefaultFillSourceLayer
                type={el.rooms.type}
                // key={ind}
                name={el.name}
                sourceId={el.rooms.sourceId}
                beforeLayer={el.rooms.beforeLayer}
                tilesetId={el.rooms.tilesetId}
                layerId={el.rooms.layerId}
                sourceLayer={el.rooms.sourceLayer}
                //roomFilter={roomFilter}
                filter={["in", "room_level", floor]}
                style={el.rooms.style}/>

                <DefaultFillSourceLayer
                type={el.roombase.type}
                // key={ind}
                sourceId={el.roombase.sourceId}
                tilesetId={el.roombase.tilesetId}
                layerId={el.roombase.layerId}
                sourceLayer={el.roombase.sourceLayer}
                beforeLayer={el.roombase.beforeLayer}

                filter={["in", "rbase_leve", floor]}

                style={el.roombase.style}/>

                <DefaultFillSourceLayer
                type={el.base.type}
                // key={ind}
                sourceId={el.base.sourceId}
                tilesetId={el.base.tilesetId}
                layerId={el.base.layerId}
                sourceLayer={el.base.sourceLayer}
                beforeLayer={el.base.beforeLayer}

                filter={["in", "base_level", floor]}

                style={el.base.style}/>
          </>
        )
      })}
    </MapView>
  )
}

export {CampusMap}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
  