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
  appUnits: APPUNITS;
  connectionTypes: CONNECTIONTYPES;
}
interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: Dispatch<SetStateAction<IAppState>>;
  toggleDarkMode: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);
function Loading() {
  const { currentAppState } = useContext(appStateContext);
  return (
    <div
      className={`fixed z-50 flex h-screen w-screen items-center justify-center ${currentAppState.loading ? "bg-light" : ""}`}
    >
      <div className="absolute left-1/2 top-1/2">
        <Image
          src="/assets/HeliosBirdseye.png"
          alt="Loading..."
          width={20}
          height={20}
          style={{
            animation: currentAppState.loading
              ? "circle 2s linear infinite"
              : "driveOffScreen 1s forwards",
          }}
        />
      </div>
    </div>
  );
}

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    loading: true,
    error: false,
    darkMode: false,
    appUnits: APPUNITS.METRIC,
    connectionTypes: CONNECTIONTYPES.NETWORK,
  });
  const [animateLoading, setAnimateLoading] = useState(true);

  const fetchSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsedSettings: IAppState = JSON.parse(savedSettings) as IAppState;
      setCurrentAppState((prev) => ({
        ...parsedSettings,
        loading: false,
      }));
    } else {
      setCurrentAppState((prev) => ({
        ...currentAppState,
        loading: false,
      }));
    }
  };

  const toggleDarkMode = () => {
    setCurrentAppState((prev) => ({
      ...currentAppState,
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

  useEffect(() => {
    if (!currentAppState.loading) {
      setTimeout(() => {
        setAnimateLoading(false);
      }, 1000);
    }
  }, [currentAppState.loading]);

  return (
    <appStateContext.Provider
      value={{
        currentAppState,
        setCurrentAppState,
        toggleDarkMode,
      }}
    >
      {animateLoading && <Loading />}
      {children}
    </appStateContext.Provider>
  );
}

export function useAppState(): IAppStateReturn {
  return useContext(appStateContext);
}
