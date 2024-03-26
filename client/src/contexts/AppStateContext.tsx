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

export enum connectionTypes {
  "Network",
  "Radio",
}

export enum speedUnits {
  "km/h",
  "mph",
}

interface IAppState {
  loading: boolean;
  error: boolean;
  darkMode: boolean;
  speedUnits: speedUnits;
  connectionTypes: connectionTypes;
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
    speedUnits: speedUnits["km/h"],
    connectionTypes: connectionTypes["Network"],
  });

  const fetchSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const {
        error: savedError,
        darkMode: savedDarkMode,
        speedUnits: savedSpeedUnits,
        connectionTypes: savedConnectionTypes,
      } = JSON.parse(savedSettings) as IAppState;
      setCurrentAppState({
        ...currentAppState,
        loading: false,
        error: savedError,
        speedUnits: savedSpeedUnits,
        darkMode: savedDarkMode,
        connectionTypes: savedConnectionTypes,
      });
    }
  };
  const toggleDarkMode = () => {
    setCurrentAppState({
      ...currentAppState,
      darkMode: !currentAppState.darkMode,
    });
  };

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        loading: currentAppState.loading,
        error: currentAppState.error,
        darkMode: currentAppState.darkMode,
        speedUnits: currentAppState.speedUnits,
        connectionTypes: currentAppState.connectionTypes,
      }),
    );
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
