import Image from "next/image";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  connectionTypes: CONNECTIONTYPES;
  socketConnected: boolean;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: Dispatch<SetStateAction<IAppState>>;
  toggleDarkMode: () => void;
  confirmVisualLoadingFulfilledAndReady: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    displayLoading: true,
    loading: true,
    error: false,
    darkMode: false,
    appUnits: APPUNITS.METRIC,
    connectionTypes: CONNECTIONTYPES.NETWORK,
    socketConnected: false,
  });

  const fetchSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsedSettings: IAppState = JSON.parse(savedSettings) as IAppState;
      setCurrentAppState((prev) => ({
        ...parsedSettings,
        loading: false,
        displayLoading: true,
      }));
    } else {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const toggleDarkMode = () => {
    setCurrentAppState((prev) => ({
      ...prev,
      darkMode: !currentAppState.darkMode,
    }));
  };

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem("settings", JSON.stringify(currentAppState));
  };

  useEffect(() => {
    fetchSettingsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!currentAppState.loading) {
      saveSettingsToLocalStorage();
    }
  }, [currentAppState]);

  const confirmVisualLoadingFulfilledAndReady = () => {
    setCurrentAppState((prev) => ({
      ...prev,
      displayLoading: false,
    }));
  };

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
        confirmVisualLoadingFulfilledAndReady,
      }}
    >
      {children}
    </appStateContext.Provider>
  );
}

export function useAppState(): IAppStateReturn {
  return useContext(appStateContext);
}
