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
    <div className="absolute top-0 flex flex-col gap-2 p-2">
      <button className={buttonClasses} onClick={toggleMapStyle}>
        {mapStates.satelliteMode ? (
          <FaSatellite className={iconClasses} />
        ) : (
          <FaLayerGroup className={iconClasses} />
        )}
      </button>
      <button className={buttonClasses} onClick={toggleCentred}>
        <FaLocationArrow className={iconClasses} />
      </button>
      <div
        className={twMerge(
          buttonClasses,
          "group relative transition-all duration-700 hover:h-24 hover:w-32 hover:rounded-md",
        )}
      >
        <FaMagnifyingGlass className="transition duration-200 group-hover:opacity-0" />
        <div className="group absolute bottom-0 left-2 top-1.5 flex flex-col gap-2">
          {trackList.map((track, index) => {
            return (
              <button
                className="flex size-full -translate-y-10 items-center gap-2 text-nowrap text-end opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
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
                  className="size-2 rounded-xl outline outline-1 outline-gray-500"
                  style={{
                    backgroundColor:
                      typeof track.layerProps.paint?.["line-color"] ===
                        "string" && viewTracks[index]
                        ? track.layerProps.paint["line-color"]
                        : "transparent",
                  }}
                />
                <p className="select-none text-xxs font-semibold">
                  {track.trackName}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
