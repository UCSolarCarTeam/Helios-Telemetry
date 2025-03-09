import React from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";

import { useAppState } from "@/contexts/AppStateContext";

import { MapStates } from "./Map";

export default function MapControls({
  mapStates,
  toggleCentred,
  toggleMapStyle,
}: {
  toggleMapStyle: () => void;
  toggleCentred: () => void;
  mapStates: MapStates;
}) {
  const {
    currentAppState: { darkMode },
  } = useAppState();
  return (
    <div className="absolute top-0 flex flex-col gap-2 p-2">
      <button
        className={`flex size-8 items-center justify-center rounded-full bg-light text-light ${darkMode && "invert"}`}
        onClick={toggleMapStyle}
      >
        {mapStates.satelliteMode ? (
          <FaSatellite className={`h-6 text-xl`} />
        ) : (
          <FaLayerGroup className={`h-6 text-xl`} />
        )}
      </button>

      <button
        className={`flex size-8 items-center justify-center rounded-full bg-light text-light ${darkMode && "invert"}`}
        onClick={toggleCentred}
      >
        <FaLocationArrow className={`h-6 text-xl`} />
      </button>
    </div>
  );
}
