import React from 'react'
import './App.css'
import TabsContainer from './components/containers/TabsContainer'
import BottomInformationContainer from './components/containers/BottomInformationContainer'
import MapContainer from './components/containers/MapContainer'
import HeroContainer from './components/containers/HeroContainer'
import LogoStatusContainer from './components/containers/LogoStatusContainer'
import { useAppState } from './contexts/AppStateContext'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const { currentAppState } = useAppState()
  // 38, 55, 7
  return (
    <div className={currentAppState.darkMode ? 'dark' : ''}>
      <div className="dark:bg-dark bg-light dark:text-dark text-light p-4 h-screen w-screen overflow-x-hidden">
        <div className="flex flex-col gap-y-2 h-full ">
          <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
            <div className="w-36 mx-auto ">
              <LogoStatusContainer />
            </div>
            <div className="grow">
              <BrowserRouter>
                <TabsContainer />
              </BrowserRouter>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
            <div className="grow h-96 w-96">
              <MapContainer />
            </div>
            <div className="basis-2/3 grow">
              <HeroContainer />
            </div>
          </div>
          <div className="grid">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
