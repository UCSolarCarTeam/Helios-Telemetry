import { useTheme } from "next-themes";
import React, { useCallback, useMemo, useState } from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import { TrackList } from "@/components/molecules/MapMolecules/Map";
import { Coords } from "@shared/helios-types/src/types";

type MapStates = {
  centered: boolean;
  currentCarLocation: Coords;
  satelliteMode: boolean;
};

/**
 * A floating control panel rendered over the map that allows users to:
 * - Toggle satellite view or vector map style
 * - Re-center the map to follow the car
 * - choose the track that they want to view on demo mode
 *
 * Props:
 * @param {() => void} toggleMapStyle - Function to toggle between satellite and vector map styles
 * @param {() => void} toggleCentred - Function to toggle whether the map is centered on the car
 * @param {Dispatch<SetStateAction<boolean[]>>} setViewTracks - State setter to control which track layers are visible
 * @param {MapStates} mapStates - Current map interaction states (centered, satelliteMode, car position)
 * @param {TrackList[]} trackList - Metadata for all available track overlays
 * @param {boolean[]} viewTracks - Booleans to indicate which track layers are currently visible
 */
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
  const { resolvedTheme } = useTheme();

  const buttonClasses = useMemo(
    () =>
      `flex size-8 items-center justify-center rounded-full bg-light text-light ${resolvedTheme === "dark" && "invert"}`,
    [resolvedTheme],
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
      <div
        className={twMerge(buttonClasses, "relative")}
        onClick={toggleRaceTracks}
      >
        <FaMagnifyingGlass />
        <div
          className={`absolute left-12 flex flex-col gap-2 rounded bg-inherit p-4 transition-opacity duration-300 ${viewRaceTracks ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {trackList.map((track: TrackList, index) => {
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
                  className={`size-2 rounded-xl outline outline-1 outline-gray-500 ${resolvedTheme === "dark" && "invert"}`}
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
