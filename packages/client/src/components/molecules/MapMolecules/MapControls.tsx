import React, { useMemo } from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import { useAppState } from "@/contexts/AppStateContext";
import { Coords } from "@shared/helios-types/src/types";

import { TrackList } from "./Map";

type MapStates = {
  centered: boolean;
  currentCarLocation: Coords;
  satelliteMode: boolean;
};

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
    <div className="absolute top-0 z-50 flex flex-col gap-4 p-2">
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
