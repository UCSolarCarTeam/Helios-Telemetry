import React, { useMemo } from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MapRef } from "react-map-gl";
import { twMerge } from "tailwind-merge";

import { useAppState } from "@/contexts/AppStateContext";
import { Coords } from "@shared/helios-types/src/types";

import { MapStates, TrackList } from "./Map";

export default function MapControls({
  mapStates,
  setViewTracks,
  toggleCentred,
  toggleMapStyle,
  trackList,
  viewTracks,
}: {
  toggleMapStyle: () => void;
  toggleCentred: () => void;
  setViewTracks: React.Dispatch<React.SetStateAction<boolean[]>>;
  mapStates: MapStates;
  trackList: TrackList[];
  viewTracks: boolean[];
}) {
  const {
    currentAppState: { darkMode },
  } = useAppState();
  const buttonClasses = useMemo(
    () =>
      `flex size-8 items-center justify-center rounded-full bg-light text-light ${darkMode && "invert"}`,
    [darkMode],
  );
  const iconClasses = useMemo(() => `h-6 text-xl`, []);
  return (
    <div className="absolute top-0 flex flex-col gap-4 p-2">
      <button className={buttonClasses} onClick={toggleMapStyle}>
        {mapStates.satelliteMode ? (
          <FaSatellite className={iconClasses} />
        ) : (
          <FaLayerGroup className={iconClasses} />
        )}
      </button>
      <button
        className={twMerge(buttonClasses, mapStates.centered && "outline")}
        onClick={toggleCentred}
      >
        <FaLocationArrow className={iconClasses} />
      </button>
      <button
        className={twMerge(
          buttonClasses,
          "group relative transition-all duration-700 focus-within:h-24 focus-within:w-32 focus-within:rounded-md",
        )}
      >
        <FaMagnifyingGlass className="transition duration-200 group-focus-within:opacity-0" />
        <div className="group absolute bottom-0 left-2 top-1.5 flex flex-col gap-2">
          {trackList.map((track, index) => {
            return (
              <button
                className="flex size-full -translate-y-10 items-center gap-2 text-nowrap text-end opacity-0 transition duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                key={track.sourceProps.id}
                onClick={() =>
                  setViewTracks((prevState) => {
                    const newState = [...prevState];
                    newState[index] = !newState[index];
                    return newState;
                  })
                }
                style={{
                  transitionDelay: `${(3 - index) * 100}ms`,
                }}
              >
                <div
                  className={`size-2 rounded-xl outline outline-1 outline-gray-500 ${darkMode && "invert"}`}
                  style={{
                    backgroundColor:
                      typeof track.layerProps.paint?.["line-color"] ===
                        "string" && viewTracks[index]
                        ? track.layerProps.paint["line-color"]
                        : "transparent",
                  }}
                />
                <p className="hidden select-none text-xxs font-semibold group-focus-within:block">
                  {track.trackName}
                </p>
              </button>
            );
          })}
        </div>
      </button>
    </div>
  );
}

const lerp = (
  startPosition: number,
  endPosition: number,
  timeOfAnimation: number,
) => {
  return startPosition * (1 - timeOfAnimation) + endPosition * timeOfAnimation;
};
const calculateBearing = (start: Coords, end: Coords): number => {
  //using the haversine formula from https://www.movable-type.co.uk/scripts/latlong.html
  const startLat = (start.lat * Math.PI) / 180; //convert to radians
  const startLng = (start.long * Math.PI) / 180;
  const endLat = (end.lat * Math.PI) / 180;
  const endLng = (end.long * Math.PI) / 180;

  const deltaLng = endLng - startLng;
  const x = Math.sin(deltaLng) * Math.cos(endLat);
  const y =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLng);

  const bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
};

const fitBounds = (
  mapRef: MapRef | undefined,
  coordsA: Coords,
  coordsB: Coords,
) => {
  if (!mapRef) return;
  mapRef.fitBounds(
    [
      [coordsA.long, coordsA.lat],
      [coordsB.long, coordsB.lat],
    ],
    {
      linear: true,
      maxZoom: 16,
      padding: { bottom: 35, left: 35, right: 35, top: 35 },
    },
  );
};
const isOutsideBounds = (
  mapRef: MapRef | undefined,
  coordinates: Coords[],
): boolean => {
  if (!mapRef || !coordinates) return false;
  const bounds = mapRef.getBounds();
  if (!bounds) return false;
  const { lat: northLat, lng: eastLng } = bounds.getNorthEast();
  const { lat: southLat, lng: westLng } = bounds.getSouthWest();
  coordinates.forEach((coord) => {
    if (
      coord.long < westLng ||
      coord.long > eastLng ||
      coord.lat < southLat ||
      coord.lat > northLat
    ) {
      return true;
    }
  });
  return false;
};

const distance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const mapCameraControls = {
  calculateBearing,
  distance,
  fitBounds,
  isOutsideBounds,
  lerp,
};
