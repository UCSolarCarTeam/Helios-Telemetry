import ReactMap, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

type ILocation = {
  lat: number
  lng: number
}

type IMapProps = {
  carLocation: ILocation
  mapLocation: ILocation
  followMap: boolean
}

function Map(props: IMapProps): JSX.Element {
  const { carLocation, mapLocation, followMap } = props

  return (
    <ReactMap
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPSAPIKEY as string}
      initialViewState={{
        longitude: mapLocation.lng,
        latitude: mapLocation.lat,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      boxZoom={!followMap}
      doubleClickZoom={!followMap}
      dragPan={!followMap}
      dragRotate={!followMap}
      scrollZoom={!followMap}
      keyboard={!followMap}
    >
      <Marker longitude={carLocation.lng} latitude={carLocation.lat} anchor={'center'}>
        <img src="/assets/HeliosBirdseye.png" alt="map-pin" width={20} />
      </Marker>
    </ReactMap>
  )
}

export default Map
