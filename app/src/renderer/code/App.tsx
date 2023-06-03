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
  return (
    <div className={currentAppState.darkMode ? 'dark' : ''}>
      <div className="dark:bg-dark bg-light dark:text-dark text-light min-w-screen">
        <div className="p-4 flex flex-col">
          <div className="flex flex-wrap lg:h-[38%]">
            <div className="w-36 flex-none mx-auto ">
              <LogoStatusContainer />
            </div>
            <div className="flex-1">
              <BrowserRouter>
                <TabsContainer />
              </BrowserRouter>
            </div>
          </div>
          <div className="flex flex-wrap lg:h-[55%]">
            <div className="w-96">
              <MapContainer />
            </div>
            <div className="flex-1">
              <HeroContainer />
            </div>
          </div>
          <div className="lg:h-[7%]">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
