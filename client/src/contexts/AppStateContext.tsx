import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum CONNECTIONTYPES {
  NETWORK = "Network",
  RADIO = "Radio",
}

export enum APPUNITS {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

interface IAppState {
  loading: boolean;
  error: boolean;
  darkMode: boolean;
  speedUnits: APPUNITS;
  connectionTypes: CONNECTIONTYPES;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: (state: IAppState) => void;
  toggleDarkMode: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    loading: true,
    error: false,
    darkMode: false,
    speedUnits: APPUNITS.METRIC,
    connectionTypes: CONNECTIONTYPES.NETWORK,
  });

  const fetchSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsedSettings: IAppState = JSON.parse(savedSettings) as IAppState;
      setCurrentAppState((prevState) => ({
        ...prevState,
        ...parsedSettings,
        loading: false,
      }));
    }
  };

  const toggleDarkMode = () => {
    setCurrentAppState({
      ...currentAppState,
      darkMode: !currentAppState.darkMode,
    });
  };

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem("settings", JSON.stringify(currentAppState));
  };

  useEffect(() => {
    fetchSettingsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (currentAppState.loading === false) {
      saveSettingsToLocalStorage();
    }
  }, [currentAppState]);

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
