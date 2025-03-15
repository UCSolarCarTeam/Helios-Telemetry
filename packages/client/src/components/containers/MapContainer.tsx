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
  // useEffect(() => {
  //   if (isDemo) {
  //     const interval = setInterval(() => {
  //       setCarLocation((prevState) => ({
  //         lat: prevState.lat + 0.0001,
  //         long: prevState.long,
  //       }));
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isDemo]);

  // useEffect(() => {
  //   if (!isDemo) {
  //     setCarLocation({
  //       lat: currentPacket.Telemetry.GpsLatitude,
  //       long: currentPacket.Telemetry.GpsLongitude,
  //     });
  //   }
  // }, [currentPacket, isDemo]);

  useEffect(() => {
    setCarLocation({
      lat: currentPacket.Telemetry.GpsLatitude,
      long: currentPacket.Telemetry.GpsLongitude,
    });
  }, [currentPacket]);

  return (
    <div className="size-full">
      <div className="grid h-[90%]">
        <Map
          carLocation={carLocation}
          lapLocation={currentAppState.lapCoords}
        />
      </div>
      <div className="grid h-[10%]">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
