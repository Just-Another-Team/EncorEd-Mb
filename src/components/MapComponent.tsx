import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapboxGL, { 
  MapView,
  Camera,
  VectorSource,
  FillLayer
} from "@rnmapbox/maps"
import { CampusMapProps } from '../types/componentProps';

MapboxGL.setAccessToken("pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA")

const CampusMap = ({centerCoordinate, zoom, filter, onPress, floor}: CampusMapProps) => {

  return(
    <MapView
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

      <Secondfloor floor={floor} onPress={onPress}/>
      <Mezzanine floor={floor} onPress={onPress} />
      <Upperfloor floor={floor} onPress={onPress}/>
      <Ground floor={floor} onPress={onPress}/>
      <Basement floor={floor} onPress={onPress}/>

    </MapView>
  )
}

const Basement = ({floor, onPress}:any) => {
  return(
    <>
      <VectorSource
      id='Basement_base_vs'
      url='mapbox://amarilloshinlee.clkj7u5fo0ake2jnthdokr2uq-6reio'>

        <FillLayer
        id='basement_base_fl'
        sourceID='Basement_base_vs'
        sourceLayerID='Basement_base_TS'
        style={{
          fillColor: "#8c0606"
        }}
        />

      </VectorSource>

      <VectorSource
      onPress={floor === 'B' && onPress}
      id='Basement_rooms_vs'
      url='mapbox://amarilloshinlee.clkj7y7pp048a2bnrjj1njaqx-64e8r'>

        <FillLayer
        id='basement_rooms_fl'
        sourceID='Basement_rooms_vs'
        sourceLayerID='Basement_rooms'
        aboveLayerID='basement_base_fl'
        style={{
          visibility: floor === 'B' ? 'visible' : 'none',
          fillColor: "#cf3e3e"
        }}
        />

      </VectorSource>
    </>
  )
}

const Ground = ({floor, onPress}:any) => {
  return(
    <>
      <VectorSource
      id='Ground_base_vs'
      url='mapbox://amarilloshinlee.clkj8y3i504j62hjofi4dbgii-5sn2g'>
        <FillLayer
        id='ground_base_fl'
        sourceID='Ground_base_vs'
        sourceLayerID='Ground_base'
        aboveLayerID='basement_rooms_fl'
        style={{
          visibility: floor !== 'B' ? 'visible' : 'none',
          fillColor: "#945309"
        }}
        />
      </VectorSource>

      <VectorSource
      onPress={floor === 'G' && onPress}
      id='Ground_rooms_vs'
      url='mapbox://amarilloshinlee.clkj97amc03ai2hoabzco05y2-58eeo'>

        <FillLayer
        id='ground_rooms_fl'
        sourceID='Ground_rooms_vs'
        sourceLayerID='Ground_rooms'
        aboveLayerID='ground_base_fl'
        style={{
          visibility: floor === 'G' ? 'visible' : 'none',
          fillColor: "#de8e33"
        }}
        />

      </VectorSource>
    </>
  )
}

const Upperfloor = ({floor}:any) => {
  return(
    <VectorSource
      id='Upperfloor_base_vs'
      url='mapbox://amarilloshinlee.clkk7x7wc0j3b2anxuxen5yah-37tsr'>

      <FillLayer
      id='upperfloor_base_fl'
      sourceID='Upperfloor_base_vs'
      sourceLayerID='Upperfloor_base'
      aboveLayerID='ground_rooms_fl'
      style={{
        visibility: floor !== 'B' && floor !== 'G' ? 'visible' : 'none',
        fillColor: "#819407"
      }}
      />

    </VectorSource>
  )
}

const Mezzanine = ({floor, onPress}: any) => {
  return(
    <>
      <VectorSource
      onPress={floor === 'M' && onPress}
      id='Mezzanine_rooms_vs'
      url='mapbox://amarilloshinlee.clkak13yd02412bntayv0jqcz-5nk8z'>

        <FillLayer
        id='Mezzanine_rooms_fl'
        sourceID='Mezzanine_rooms_vs'
        sourceLayerID='Mezzanine_rooms'
        aboveLayerID='upperfloor_base_fl'
        style={{
          visibility: floor === 'M' ? 'visible' : 'none',
          fillColor: "#cbe03f"
        }}
        />

      </VectorSource>
    </>
  )
}

const Secondfloor = ({floor, onPress}: any) => {
  return(
    <>
      <VectorSource
      onPress={floor === '2' && onPress}
      id='Secondfloor_rooms_vs'
      url='mapbox://amarilloshinlee.clkk931nk01h72amq9llaz3f9-6p1ko'>

        <FillLayer
        id='Secondfloor_rooms_fl'
        sourceID='Secondfloor_rooms_vs'
        sourceLayerID='Secondfloor_rooms'
        aboveLayerID='Mezzanine_rooms_fl'
        style={{
          visibility: floor === '2' ? 'visible' : 'none',
          fillColor: "#7ae03f"
        }}
        />

      </VectorSource>
    </>
  )
}

export {CampusMap}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
  