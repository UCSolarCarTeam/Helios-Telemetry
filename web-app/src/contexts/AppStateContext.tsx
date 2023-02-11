import { createContext, useContext, useState, ReactNode } from "react";

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

const appStateContext = createContext({});

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    loading: false,
    error: false,
    darkMode: false,
    speedUnits: speedUnits["km/h"],
  });

  return (
    <appStateContext.Provider value={{ currentAppState, setCurrentAppState }}>
      {children}
    </appStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(appStateContext);
}
