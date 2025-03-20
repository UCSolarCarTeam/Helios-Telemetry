import { type JSX, useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";

function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const isDemo = currentAppState.connectionType === "DEMO";
  const [carLocation, setCarLocation] = useState(currentAppState.lapCoords);
  useEffect(() => {
    if (isDemo) {
      const interval = setInterval(() => {
        setCarLocation((prevState) => ({
          lat: prevState.lat + 0.0001,
          long: prevState.long,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isDemo]);

  useEffect(() => {
    if (!isDemo) {
      setCarLocation({
        lat: currentPacket.Telemetry.GpsLatitude,
        long: currentPacket.Telemetry.GpsLongitude,
      });
    }
  }, [currentPacket, isDemo]);

  return (
    <div className="flex size-full flex-col">
      <div className="flex-grow">
        <Map
          carLocation={carLocation}
          lapLocation={currentAppState.lapCoords}
        />
      </div>
      <div className="min-h-[50px]">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
