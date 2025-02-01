import { type JSX, useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import type { Coords } from "@shared/helios-types";

function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const isDemo = currentAppState.connectionType === "DEMO";

  const [mapInputs, setMapInputs] = useState<{
    lapLocation: Coords;
    carLocation: Coords;
  }>(() => ({
    carLocation: currentAppState.lapCoords,
    lapLocation: currentAppState.lapCoords,
  }));

  useEffect(() => {
    setMapInputs((prevMapInputs) => ({
      ...prevMapInputs,
      lapLocation: currentAppState.lapCoords,
    }));
  }, [currentAppState.lapCoords]);

  useEffect(() => {
    if (isDemo) {
      setMapInputs((prevMapInputs) => ({
        ...prevMapInputs,
        carLocation: currentAppState.lapCoords,
      }));

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
    }
  }, [isDemo]);

  useEffect(() => {
    if (!isDemo) {
      setMapInputs((prevMapInputs) => ({
        ...prevMapInputs,
        carLocation: {
          lat: currentPacket.Telemetry.GpsLatitude,
          long: currentPacket.Telemetry.GpsLongitude,
        },
      }));
    }
  }, [currentPacket]);

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
