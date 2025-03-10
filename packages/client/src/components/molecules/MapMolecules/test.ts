import { generateFakeTelemetryData } from "@shared/helios-types";

import { GEO_DATA } from "./ExampleCoordinates";
import { PacketMarker } from "./Map";

const { raceTrackGeoJSON_GRAND_FULL_COURSE } = GEO_DATA;
export const Hydrated_Grand_Full_course: PacketMarker[] =
  raceTrackGeoJSON_GRAND_FULL_COURSE.features[0].geometry.coordinates.map(
    (coords) => {
      const newPacketMarker: PacketMarker = {
        data: generateFakeTelemetryData(),
        markerCoords: {
          latitude: coords[1]!,
          longitude: coords[0]!,
        },
        open: false,
      };
      return newPacketMarker;
    },
  );
