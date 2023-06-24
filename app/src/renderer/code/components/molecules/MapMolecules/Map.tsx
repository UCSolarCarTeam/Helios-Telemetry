import ReactMap from 'react-map-gl'

type ILocation = {
  lat: number
  lng: number
}

type IMapProps = {
  carLocation: ILocation
  mapLocation: ILocation
}

function Map(props: IMapProps): JSX.Element {
  const { carLocation, mapLocation } = props

  return (
    <>
      <ReactMap
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={process.env.VITE_REACT_APP_MAPSAPIKEY}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </>
  )
}

export default Map
