import { useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/contexts/AppStateContext";

function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const [mapInputs, setMapInputs] = useState({
    carLocation: { lat: 38.9377572, lng: -95.6777937 },
    lapLocation: {
      lat: currentAppState.lapCoords.lat,
      lng: currentAppState.lapCoords.long,
    },
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
          mapLocation={mapInputs.carLocation}
          lapLocation={mapInputs.lapLocation}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
