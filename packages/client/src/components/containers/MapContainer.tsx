import { type JSX, useEffect, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import { Coords } from "@shared/helios-types";

import { GEO_DATA } from "../molecules/MapMolecules/MapSetup";

const {
  raceTrackGeoJSON_BRAINERD_INTERNATIONAL_RACEWAY_TRACK: { features },
} = GEO_DATA;
const TRACK_COORDINATES = features[0].geometry.coordinates;
// Previous 2025 track: raceTrackGeoJSON_GRAND_FULL_COURSE
const startingLocation: Coords = {
  lat: TRACK_COORDINATES[0]![1]!,
  long: TRACK_COORDINATES[0]![0]!,
};
function MapContainer(): JSX.Element {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacketStore();

  const isDemo = currentAppState.connectionType === "DEMO";
  const [carLocation, setCarLocation] = useState(
    isDemo ? startingLocation : currentAppState.lapCoords,
  );
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
      }, 2000);

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
      <div className="h-11">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
