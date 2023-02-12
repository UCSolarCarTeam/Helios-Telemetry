import { createContext, useContext, useState, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

interface IAppState {
  loading: boolean;
  error: boolean;
  theme: string;
}

const appStateContext = createContext({
  appState: {
    loading: false,
    error: false,
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  } as IAppState,
  setAppState: (appState: IAppState) => {},
});

export function AppStateContextProvider({ children }: Props) {
  const [appState, setAppState] = useState<IAppState>({
    loading: false,
    error: false,
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  });

  return (
    <appStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </appStateContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appStateContext);
}
