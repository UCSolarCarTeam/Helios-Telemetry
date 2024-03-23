import { type ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

enum speedUnits {
  "km/h",
  "mph",
}

interface IAppState {
  loading: boolean;
  error: boolean;
  darkMode: boolean;
  speedUnits: speedUnits;
}

interface IAppStateReturn {
  currentAppState: IAppState;
  setCurrentAppState: (state: IAppState) => void;
  toggleDarkMode: () => void;
  toggleSpeedUnits: () => void;
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn);

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    loading: false,
    error: false,
    darkMode: false,
    speedUnits: speedUnits["km/h"],
  });

  const toggleDarkMode = () => {
    setCurrentAppState({
      ...currentAppState,
      darkMode: !currentAppState.darkMode,
    });
  };

  const toggleSpeedUnits = () => {
    setCurrentAppState({
      ...currentAppState,
      speedUnits:
        currentAppState.speedUnits === speedUnits["km/h"]
          ? speedUnits["mph"]
          : speedUnits["km/h"],
    });
  };

  return (
    <appStateContext.Provider
      value={{
        currentAppState,
        setCurrentAppState,
        toggleDarkMode,
        toggleSpeedUnits,
      }}
    >
      {children}
    </appStateContext.Provider>
  );
}

export function useAppState(): IAppStateReturn {
  return useContext(appStateContext);
}

export default speedUnits;
