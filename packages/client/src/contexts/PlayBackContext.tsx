import {
  type JSX,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { ITelemetryData } from "@shared/helios-types";

interface IPlaybackContextReturn {
  playbackData: ITelemetryData[];
  setPlaybackData: (data: ITelemetryData[]) => void;
}

const playbackContext = createContext<IPlaybackContextReturn>(
  {} as IPlaybackContextReturn,
);

export function PlaybackContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [playbackData, setPlaybackData] = useState<ITelemetryData[]>([]);

  return (
    <playbackContext.Provider
      value={{
        playbackData,
        setPlaybackData,
      }}
    >
      {children}
    </playbackContext.Provider>
  );
}

export function usePlaybackContext(): IPlaybackContextReturn {
  return useContext(playbackContext);
}
