import { type JSX, useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/contexts/AppStateContext";
import type { Coords } from "@shared/helios-types";

function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const [mapInputs, setMapInputs] = useState<{
    lapLocation: Coords;
    carLocation: Coords;
  }>({
    carLocation: {
      lat: currentAppState.lapCoords.lat,
      long: currentAppState.lapCoords.long,
    },
    lapLocation: currentAppState.lapCoords,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setMapInputs((prevState) => ({
        ...prevState,
        carLocation: {
          lat: prevState.carLocation.lat + 0.0001,
          long: prevState.carLocation.long,
        },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMapInputs((prevMapInputs) => ({
      ...prevMapInputs,
      lapLocation: {
        lat: currentAppState.lapCoords.lat,
        long: currentAppState.lapCoords.long,
      },
    }));
  }, [currentAppState.lapCoords]);

  return (
    <div className="size-full">
      <div className="grid h-[90%]">
        <Map
          carLocation={mapInputs.carLocation}
          lapLocation={currentAppState.lapCoords}
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
