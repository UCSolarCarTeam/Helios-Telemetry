import { type JSX, useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";

import { GEO_DATA } from "../molecules/MapMolecules/ExampleCoordinates";

const {
  raceTrackGeoJSON_GRAND_FULL_COURSE: { features },
} = GEO_DATA;
const TRACK_COORDINATES = features[0].geometry.coordinates;
function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const isDemo = currentAppState.connectionType === "DEMO";
  const [carLocation, setCarLocation] = useState(currentAppState.lapCoords);
  useEffect(() => {
    if (isDemo) {
      let positionPacket = 0;
      const interval = setInterval((prevState) => {
        setCarLocation({
          lat: TRACK_COORDINATES[positionPacket]?.[1] ?? prevState.lat,
          long: TRACK_COORDINATES[positionPacket]?.[0] ?? prevState.long,
        });
        positionPacket++;
        if (positionPacket >= TRACK_COORDINATES.length) {
          positionPacket = 0;
        }
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
