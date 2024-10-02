import { useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";

function MapContainer(): JSX.Element {
  const [mapInputs, setMapInputs] = useState({
    carLocation: { lat: 38.9277572, lng: -95.6777937 },
    lapLocation: { lat: 38.9377572, lng: -95.677937 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMapInputs((prevState) => ({
        ...prevState,
        carLocation: {
          lat: prevState.carLocation.lat + 0.0001,
          lng: prevState.carLocation.lng,
        },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="size-full">
      <div className="grid h-[90%]">
        <Map
          carLocation={mapInputs.carLocation}
          lapLocation={mapInputs.lapLocation}
          mapLocation={mapInputs.carLocation}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
