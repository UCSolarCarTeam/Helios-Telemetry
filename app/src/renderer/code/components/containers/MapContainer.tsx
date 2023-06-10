import React from 'react'
import Map from '../molecules/MapMolecules/Map'
import MapText from '../molecules/MapMolecules/MapText'

function MapContainer() {
  return (
    <div className="w-full h-full">
      <div className="grid h-[90%] w-full">
        <Map
          carLocation={{ lat: 38.9277572, lng: -95.6777937 }}
          mapLocation={{ lat: 38.9277572, lng: -95.6777937 }}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText />
      </div>
    </div>
  )
}

export default MapContainer
