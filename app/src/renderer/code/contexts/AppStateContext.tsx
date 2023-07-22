import { createContext, useContext, useState, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

enum speedUnits {
  'km/h',
  'mph'
}

interface IAppState {
  loading: boolean
  error: boolean
  darkMode: boolean
  speedUnits: speedUnits
}

interface IAppStateReturn {
  currentAppState: IAppState
  setCurrentAppState: (state: IAppState) => void
  toggleDarkMode: () => void
}

const appStateContext = createContext<IAppStateReturn>({} as IAppStateReturn)

export function AppStateContextProvider({ children }: Props) {
  const [currentAppState, setCurrentAppState] = useState<IAppState>({
    loading: false,
    error: false,
    darkMode: false,
    speedUnits: speedUnits['km/h']
  })

  const toggleDarkMode = () => {
    setCurrentAppState({
      ...currentAppState,
      darkMode: !currentAppState.darkMode
    })
  }

  return (
    <appStateContext.Provider value={{ currentAppState, setCurrentAppState, toggleDarkMode }}>
      {children}
    </appStateContext.Provider>
  )
}

export function useAppState(): IAppStateReturn {
  return useContext(appStateContext)
}
