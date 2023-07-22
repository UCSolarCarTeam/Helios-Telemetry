import React, { useEffect, useState } from 'react'
import Map from '../molecules/MapMolecules/Map'
import MapText from '../molecules/MapMolecules/MapText'

function MapContainer(): JSX.Element {
  const [carLocation, setCarLocation] = useState({ lat: 38.9277572, lng: -95.6777937 })
  const [followMap, setFollowMap] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCarLocation({ lat: carLocation.lat + 0.0001, lng: carLocation.lng })
    }, 1000)
    return () => clearInterval(interval)
  }, [carLocation])

  return (
    <div className="h-full w-full">
      <div className="grid h-[90%]">
        <Map
          carLocation={carLocation}
          mapLocation={{ lat: 38.9277572, lng: -95.6777937 }}
          followMap={followMap}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText setFollowMap={setFollowMap} followMap={followMap} />
      </div>
    </div>
  )
}

export default MapContainer
