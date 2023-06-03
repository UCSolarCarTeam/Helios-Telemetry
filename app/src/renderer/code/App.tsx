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
      <div className="dark:bg-dark bg-light dark:text-dark text-light min-w-screen min-h-screen p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-w-screen min-h-screen ">
          <div className="col-span-1 lg:col-span-1 lg:h-[38%] mx-auto">
            <LogoStatusContainer />
          </div>
          <div className="col-span-1 lg:col-span-11 lg:h-[38%]">
            <BrowserRouter>
              <TabsContainer />
            </BrowserRouter>
          </div>

          <div className="col-span-1 lg:col-span-4 lg:h-[55%]">
            <MapContainer />
          </div>
          <div className="col-span-1 lg:col-span-8 lg:h-[55%] ">
            <HeroContainer />
          </div>

          <div className="col-span-1 lg:col-span-12 lg:h-[7%]">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
