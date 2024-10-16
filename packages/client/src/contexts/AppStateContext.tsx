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

import { PausePresentationRounded } from "@mui/icons-material";
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
  radioConnected: boolean;
  userLatency: number;
  carLatency: number;
  lapCoords: Coords;
  playbackSwitch: boolean;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: Dispatch<SetStateAction<IAppState>>;
  toggleDarkMode: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    appUnits: APPUNITS.METRIC,
    carLatency: 0,
    connectionType: CONNECTIONTYPES.NETWORK,
    darkMode: false,
    displayLoading: true,
    error: false,
    lapCoords: { lat: 51.081021, long: -114.136084 },
    favourites: [],
    loading: true,
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
        connectionType: CONNECTIONTYPES.DEMO,
        loading: false,
      }));
    }, 5000);
  }, []);

  const fetchSettingsFromLocalStorage = useCallback(() => {
    const savedSettings = localStorage.getItem("settings");
    const favourites = localStorage.getItem("favourites");
    if (savedSettings && favourites) {
      const parsedSettings: IAppState = JSON.parse(savedSettings) as IAppState;
      const parsedFavourites: string[] = JSON.parse(favourites) as string[];
      setCurrentAppState((prev) => ({
        ...prev,
        appUnits: parsedSettings.appUnits,
        connectionType: parsedSettings.connectionType,
        darkMode: parsedSettings.darkMode,
        lapCoords: parsedSettings.lapCoords,
        darkMode: parsedSettings.darkMode,
        favourites: parsedFavourites,
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
