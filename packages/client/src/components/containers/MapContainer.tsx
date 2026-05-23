import { type JSX, useEffect, useMemo, useState } from "react";

import Map from "@/components/molecules/MapMolecules/Map";
import MapText from "@/components/molecules/MapMolecules/MapText";
import { CONNECTIONTYPES, useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import { usePlaybackStore } from "@/stores/usePlayback";
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
  const { playbackData } = usePlaybackStore((state) => ({
    playbackData: state.playbackData,
  }));

  const hasPlaybackCoordinates =
    currentAppState.playbackSwitch &&
    playbackData.some(
      (packet) =>
        Number.isFinite(packet.Telemetry.GpsLatitude) &&
        Number.isFinite(packet.Telemetry.GpsLongitude),
    );
  const isDemo =
    currentAppState.connectionType === CONNECTIONTYPES.DEMO &&
    !hasPlaybackCoordinates;

  const liveCarLocation = useMemo<Coords>(
    () => ({
      lat: currentPacket.Telemetry.GpsLatitude,
      long: currentPacket.Telemetry.GpsLongitude,
    }),
    [currentPacket],
  );

  const [demoCarLocation, setDemoCarLocation] = useState(startingLocation);

  const carLocation = isDemo ? demoCarLocation : liveCarLocation;

  useEffect(() => {
    if (!isDemo) return;

    let positionPacket = 0;
    const interval = setInterval(() => {
      setDemoCarLocation((prevState) => ({
        lat: TRACK_COORDINATES[positionPacket]?.[1] ?? prevState.lat,
        long: TRACK_COORDINATES[positionPacket]?.[0] ?? prevState.long,
      }));
      positionPacket++;
      if (positionPacket >= TRACK_COORDINATES.length) {
        positionPacket = 0;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isDemo]);

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
