// This file controls app settings.
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { IPlaybackDateTime } from "@/components/molecules/LogoStatusMolecules/PlaybackDatePicker";
import type { Coords } from "@shared/helios-types";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum CONNECTIONTYPES {
  DEMO = "DEMO",
  NETWORK = "NETWORK",
  RADIO = "RADIO",
}

export enum APPUNITS {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

interface IAppState {
  displayLoading: boolean;
  loading: boolean;
  error: boolean;
  darkMode: boolean;
  appUnits: APPUNITS;
  favourites: string[];
  connectionType: CONNECTIONTYPES;
  socketConnected: boolean;
  mqttConnected: boolean;
  radioConnected: boolean;
  userLatency: number;
  carLatency: number;
  lapCoords: Coords;
  playbackSwitch: boolean;
  playbackDateTime: IPlaybackDateTime;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: Dispatch<SetStateAction<IAppState>>;
  toggleDarkMode: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

/**
 * Just another context provider that manages a lot of the app's state
 * for the future, you could technically use redux and it might be better to do that instead
 * thats for future recruits though
 *
 * you can read some documentation on context providers here:
 * https://www.telerik.com/blogs/react-basics-how-when-use-react-context
 *
 * and then you can read the documentation for this specific context provider here:
 * in docs/CLIENT.md#appstatecontextprovider
 *
 */
export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    appUnits: APPUNITS.METRIC,
    carLatency: 0,
    connectionType: CONNECTIONTYPES.DEMO,
    darkMode: false,
    displayLoading: true,
    error: false,
    favourites: [],
    lapCoords: { lat: 37.001949324, long: -86.366554059 },
    loading: true,
    mqttConnected: false,
    playbackDateTime: {
      date: null,
      endTime: null,
      startTime: null,
    },
    playbackSwitch: false,
    radioConnected: false,
    socketConnected: false,
    userLatency: 0,
  });

  // Connection State Manager
  useEffect(() => {
    if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      if (currentAppState.socketConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          connectionType: CONNECTIONTYPES.NETWORK,
          loading: false,
        }));
      }
      if (currentAppState.radioConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          connectionType: CONNECTIONTYPES.RADIO,
          loading: false,
        }));
      }
    }
    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: !currentAppState.socketConnected,
      }));
    }
    if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: !currentAppState.radioConnected,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAppState.socketConnected, currentAppState.radioConnected]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: false,
      }));
    }, 5000);
  }, []);

  const fetchSettingsFromLocalStorage = useCallback(() => {
    const savedSettings = localStorage.getItem("settings");
    const favourites = localStorage.getItem("favourites");

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings) as Partial<IAppState>;

      const parsedFavourites = favourites
        ? (JSON.parse(favourites) as string[])
        : [
            "Motor Temp",
            "Battery Cell Voltage",
            "Vehicle Velocity",
            "Pack Voltage",
            "Pack Current",
            "Battery Average Voltage",
          ];

      const hasPlaybackDateTime = !!parsedSettings.playbackDateTime;

      const parsedPlaybackDateTime = hasPlaybackDateTime
        ? {
            date: parsedSettings.playbackDateTime!.date
              ? new Date(parsedSettings.playbackDateTime!.date)
              : null,
            endTime: parsedSettings.playbackDateTime!.endTime
              ? new Date(parsedSettings.playbackDateTime!.endTime)
              : null,
            startTime: parsedSettings.playbackDateTime!.startTime
              ? new Date(parsedSettings.playbackDateTime!.startTime)
              : null,
          }
        : {
            date: null,
            endTime: null,
            startTime: null,
          };

      setCurrentAppState((prev) => ({
        ...prev,
        appUnits: parsedSettings.appUnits ?? prev.appUnits,
        connectionType: parsedSettings.connectionType ?? prev.connectionType,
        darkMode: parsedSettings.darkMode ?? prev.darkMode,
        favourites: parsedFavourites,
        lapCoords: parsedSettings.lapCoords ?? prev.lapCoords,
        playbackDateTime: parsedPlaybackDateTime,
      }));
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setCurrentAppState((prev) => ({
      ...prev,
      darkMode: !currentAppState.darkMode,
    }));
  }, [currentAppState.darkMode]);

  const saveSettingsToLocalStorage = useCallback(() => {
    localStorage.setItem("settings", JSON.stringify(currentAppState));
  }, [currentAppState]);

  useEffect(() => {
    fetchSettingsFromLocalStorage();
  }, [fetchSettingsFromLocalStorage]);

  useEffect(() => {
    if (!currentAppState.loading) {
      saveSettingsToLocalStorage();
    }
  }, [currentAppState.loading, saveSettingsToLocalStorage]);

  // useEffect(() => {
  //   if (!currentAppState.loading) {
  //     setTimeout(() => {
  //       setAnimateLoading(false);
  //     }, 1000);
  //   }
  // }, [currentAppState.loading]);

  return (
    <appStateContext.Provider
      value={{
        currentAppState,
        setCurrentAppState,
        toggleDarkMode,
      }}
    >
      {children}
    </appStateContext.Provider>
  );
}

export function useAppState(): IAppStateReturn {
  return useContext(appStateContext);
}
