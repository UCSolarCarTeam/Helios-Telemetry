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
  connectionType: CONNECTIONTYPES;
  socketConnected: boolean;
  radioConnected: boolean;
  userLatency: number;
  carLatency: number;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: Dispatch<SetStateAction<IAppState>>;
  toggleDarkMode: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    displayLoading: true,
    loading: true,
    error: false,
    darkMode: false,
    appUnits: APPUNITS.METRIC,
    connectionType: CONNECTIONTYPES.NETWORK,
    socketConnected: false,
    radioConnected: false,
    userLatency: 0,
    carLatency: 0,
  });

  // Connection State Manager
  useEffect(() => {
    if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      if (currentAppState.socketConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          loading: false,
          connectionType: CONNECTIONTYPES.NETWORK,
        }));
      }
      if (currentAppState.radioConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          loading: false,
          connectionType: CONNECTIONTYPES.RADIO,
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
  }, [currentAppState.socketConnected, currentAppState.radioConnected]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: false,
        connectionType: CONNECTIONTYPES.DEMO,
      }));
    }, 5000);
  }, []);

  const fetchSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsedSettings: IAppState = JSON.parse(savedSettings) as IAppState;
      setCurrentAppState((prev) => ({
        ...prev,
        darkMode: parsedSettings.darkMode,
        appUnits: parsedSettings.appUnits,
        connectionType: parsedSettings.connectionType,
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
