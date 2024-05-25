import { useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";

function MapContainer(): JSX.Element {
  const [carLocation, setCarLocation] = useState({
    lat: 38.9277572,
    lng: -95.6777937,
  });
  const [lapLocation, setLapLocation] = useState({
    lat: carLocation.lat + 0.01,
    lng: carLocation.lng,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCarLocation({ lat: carLocation.lat + 0.0001, lng: carLocation.lng });
    }, 1000);
    return () => clearInterval(interval);
  }, [carLocation]);

  return (
    <div className="size-full">
      <div className="grid h-[90%]">
        <Map
          carLocation={carLocation}
          mapLocation={carLocation}
          lapLocation={lapLocation}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
