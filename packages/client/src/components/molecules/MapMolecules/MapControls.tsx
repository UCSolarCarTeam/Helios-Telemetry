// This file allows us to toggle map layers.
import React, { useCallback, useMemo, useState } from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import { TrackList } from "@/components/molecules/MapMolecules/Map";
import { useAppState } from "@/contexts/AppStateContext";
import { Coords } from "@shared/helios-types/src/types";

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
  const [viewRaceTracks, setViewRaceTracks] = useState(false);
  const toggleRaceTracks = useCallback(
    () => setViewRaceTracks(!viewRaceTracks),
    [viewRaceTracks],
  );

  const toggleTrackLayer = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.stopPropagation();
      setViewTracks((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    },
    [setViewTracks],
  );
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
        className={twMerge(buttonClasses, "relative")}
        onClick={toggleRaceTracks}
      >
        <FaMagnifyingGlass />
        <div
          className={`absolute left-12 flex flex-col gap-2 rounded bg-inherit p-4 transition-opacity duration-300 ${viewRaceTracks ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {trackList.map((track, index) => {
            return (
              <button
                className={`flex size-full items-center gap-2 text-nowrap text-end transition-transform duration-500 ${!viewRaceTracks && "-translate-y-10"}`}
                key={track.sourceProps.id}
                onClick={(e) => toggleTrackLayer(e, index)}
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
                <p className="select-none text-xxs font-semibold">
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
